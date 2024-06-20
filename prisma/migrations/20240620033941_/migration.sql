/*
  Warnings:

  - You are about to drop the column `comment` on the `comments` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `ReplyComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MediaUrl" ADD COLUMN     "replyCommentId" TEXT;

-- AlterTable
ALTER TABLE "ReplyComment" ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "content" TEXT,
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "comment",
ADD COLUMN     "content" TEXT;

-- CreateIndex
CREATE INDEX "ReplyComment_authorId_idx" ON "ReplyComment"("authorId");
