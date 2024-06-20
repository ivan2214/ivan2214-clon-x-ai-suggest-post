-- CreateEnum
CREATE TYPE "TypeTweet" AS ENUM ('TWEET', 'REPLY', 'RETWEET', 'LIKE', 'BOOKMARK', 'SHARE');

-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "typeTweet" "TypeTweet" NOT NULL DEFAULT 'TWEET';
