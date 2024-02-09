import { FastifyInstance } from 'fastify';
import { randomUUID } from 'crypto';
import z from 'zod';

import { prisma } from '../../lib/prisma';
import { redis } from '../../lib/redis';

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (request, reply) => {
    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    });
    
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid(),
    });
  
    const { pollId } = voteOnPollParams.parse(request.params);
    const { pollOptionId } = voteOnPollBody.parse(request.body);
  
    let sessionId = request.cookies.sessionId;

    if (sessionId) {
      const userPreviousVoteOnPoll = await prisma.pollVote.findUnique({
        where: {
          session_id_poll_id: {
            session_id: sessionId,
            poll_id: pollId,
          }
        }
      });

      if (!userPreviousVoteOnPoll) {
        return reply.status(404).send({ message: 'Poll not found.' })
      }

      if (userPreviousVoteOnPoll && userPreviousVoteOnPoll.poll_option_id === pollOptionId) {
        return reply.status(400).send({ message: 'You already voted on this poll.' })
      }

      await prisma.pollVote.delete({
        where: {
          id: userPreviousVoteOnPoll.id
        }
      });

      await redis.zincrby(pollId, -1, userPreviousVoteOnPoll.poll_option_id);
    }

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true,
        httpOnly: true,
      });
    }

    await prisma.pollVote.create({
      data: {
        session_id: sessionId,
        poll_id: pollId,
        poll_option_id: pollOptionId
      }
    })

    await redis.zincrby(pollId, 1, pollOptionId);

    return reply.status(201).send();
  });
}
