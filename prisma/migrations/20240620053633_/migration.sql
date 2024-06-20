/*
  Warnings:

  - You are about to drop the column `description` on the `Tweet` table. All the data in the column will be lost.
  - You are about to drop the `MediaUrl` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReplyComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contentId` to the `Tweet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "description",
ADD COLUMN     "contentId" TEXT NOT NULL;

-- DropTable
DROP TABLE "MediaUrl";

-- DropTable
DROP TABLE "ReplyComment";

-- DropTable
DROP TABLE "comments";

-- CreateTable
CREATE TABLE "content" (
    "id" TEXT NOT NULL,
    "text" TEXT,

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_urls" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,

    CONSTRAINT "media_urls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tweets_on_users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "tweetId" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "tweets_on_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "media_urls_contentId_idx" ON "media_urls"("contentId");

-- CreateIndex
CREATE INDEX "tweets_on_users_userId_idx" ON "tweets_on_users"("userId");

-- CreateIndex
CREATE INDEX "tweets_on_users_tweetId_idx" ON "tweets_on_users"("tweetId");

-- CreateIndex
CREATE INDEX "tweets_on_users_parentId_idx" ON "tweets_on_users"("parentId");

-- CreateIndex
CREATE INDEX "Tweet_contentId_idx" ON "Tweet"("contentId");
