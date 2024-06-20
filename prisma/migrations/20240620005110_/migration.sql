/*
  Warnings:

  - You are about to drop the column `mediaUrl` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MediaUrl" ADD COLUMN     "commentId" TEXT;

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "mediaUrl";

-- CreateIndex
CREATE INDEX "MediaUrl_commentId_idx" ON "MediaUrl"("commentId");
