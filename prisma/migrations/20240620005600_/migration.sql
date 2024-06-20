/*
  Warnings:

  - Made the column `tweetId` on table `ReplyComment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ReplyComment" ALTER COLUMN "tweetId" SET NOT NULL;
