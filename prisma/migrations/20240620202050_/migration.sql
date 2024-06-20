-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "originalTweetId" TEXT;

-- CreateIndex
CREATE INDEX "Tweet_originalTweetId_idx" ON "Tweet"("originalTweetId");
