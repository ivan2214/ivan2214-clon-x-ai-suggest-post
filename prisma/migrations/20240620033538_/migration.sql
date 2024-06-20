/*
  Warnings:

  - You are about to drop the column `authorId` on the `ReplyComment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ReplyComment_authorId_idx";

-- AlterTable
ALTER TABLE "ReplyComment" DROP COLUMN "authorId";
