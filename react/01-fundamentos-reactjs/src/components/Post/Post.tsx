import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Avatar } from '../Avatar/Avatar';
import { Comment } from '../Comment/Comment';

import styles from './Post.module.css';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

export type PostProps = {
  id: number,
  author: {
    name: string,
    role: string,
    avatar_url: string,
  };
  contents: {
    type: string,
    content: string,
  }[]
  publishedAt: Date
};

export function Post(props: PostProps) {
  const [comments, setComments] = useState([
    'Teste de comentário'
  ]);

  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(props.publishedAt, `d 'de' LLLL 'às' HH:mm'h'`, {
    locale: ptBR.ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(props.publishedAt, {
    locale: ptBR.ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    event?.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event?.target.setCustomValidity('');
    setNewCommentText(event?.target.value);
  }

  function handleNewCommentTextInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event?.target.setCustomValidity('Esse campo é obrigatório.');
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete
    });

    setComments(commentsWithoutDeletedOne);
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={props.author.avatar_url} />

          <div className={styles.authorInfo}>
            <strong>{props.author.name}</strong>
            <span>{props.author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={props.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {props.contents.map(content => {
          return (
            content.type === 'paragraph'
              ?
                <p>
                  {content.content}
                </p>
              :
                content.type === 'hashtag'
                  ?
                    <p>
                      {
                        content.content.split(' ').map(hashtag => {
                          return (
                            <a href="#">{hashtag}</a>
                          )
                        })
                      }
                    </p>
                  :
                    <p>
                      <a href="#">
                        {content.content}
                      </a>
                    </p>
          );
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          value={newCommentText}
          placeholder='Deixe um comentário'
          required
          onChange={handleNewCommentTextChange}
          onInvalid={handleNewCommentTextInvalid}
        />

        <footer>
          <button
            type='submit'
            disabled={newCommentText.length === 0}
          >
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  );
}
