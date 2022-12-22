/*
  Warnings:

  - The primary key for the `UserInChats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserInChats` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserInChats" DROP CONSTRAINT "UserInChats_chatId_fkey";

-- DropForeignKey
ALTER TABLE "UserInChats" DROP CONSTRAINT "UserInChats_userId_fkey";

-- AlterTable
ALTER TABLE "UserInChats" DROP CONSTRAINT "UserInChats_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserInChats_pkey" PRIMARY KEY ("userId", "chatId");

-- AddForeignKey
ALTER TABLE "UserInChats" ADD CONSTRAINT "UserInChats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInChats" ADD CONSTRAINT "UserInChats_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
