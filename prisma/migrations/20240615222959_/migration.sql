/*
  Warnings:

  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "about" TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL;
