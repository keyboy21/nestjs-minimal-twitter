/*
  Warnings:

  - You are about to drop the column `description` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "description",
ADD COLUMN     "bio" TEXT;
