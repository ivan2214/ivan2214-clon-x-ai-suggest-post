/*
  Warnings:

  - Added the required column `authorId` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "authorId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "comments_authorId_idx" ON "comments"("authorId");
