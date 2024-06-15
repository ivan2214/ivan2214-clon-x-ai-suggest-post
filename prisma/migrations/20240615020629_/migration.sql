/*
  Warnings:

  - You are about to drop the column `mediaUrl` on the `Tweet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "mediaUrl";

-- CreateTable
CREATE TABLE "MediaUrl" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tweetId" TEXT,

    CONSTRAINT "MediaUrl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MediaUrl_tweetId_idx" ON "MediaUrl"("tweetId");
