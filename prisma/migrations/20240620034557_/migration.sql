/*
  Warnings:

  - You are about to drop the column `tweetId` on the `ReplyComment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ReplyComment_tweetId_idx";

-- AlterTable
ALTER TABLE "ReplyComment" DROP COLUMN "tweetId";
