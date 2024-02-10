-- CreateTable
CREATE TABLE "poll_vote" (
    "id" SERIAL NOT NULL,
    "session_id" TEXT NOT NULL,
    "poll_id" TEXT NOT NULL,
    "poll_option_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "poll_vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "poll_vote_session_id_poll_id_key" ON "poll_vote"("session_id", "poll_id");

-- AddForeignKey
ALTER TABLE "poll_vote" ADD CONSTRAINT "poll_vote_poll_option_id_fkey" FOREIGN KEY ("poll_option_id") REFERENCES "poll_option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poll_vote" ADD CONSTRAINT "poll_vote_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
