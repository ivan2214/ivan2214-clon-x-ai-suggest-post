/*
  Warnings:

  - Added the required column `tweetId` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "tweetId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "comments_tweetId_idx" ON "comments"("tweetId");
