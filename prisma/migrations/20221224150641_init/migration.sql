/*
  Warnings:

  - The primary key for the `UserInChats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chatId` on the `UserInChats` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserInChats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chatName` to the `UserInChats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `UserInChats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserInChats" DROP CONSTRAINT "UserInChats_chatId_fkey";

-- DropForeignKey
ALTER TABLE "UserInChats" DROP CONSTRAINT "UserInChats_userId_fkey";

-- AlterTable
ALTER TABLE "UserInChats" DROP CONSTRAINT "UserInChats_pkey",
DROP COLUMN "chatId",
DROP COLUMN "userId",
ADD COLUMN     "chatName" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL,
ADD CONSTRAINT "UserInChats_pkey" PRIMARY KEY ("userEmail", "chatName");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_name_key" ON "Chat"("name");

-- AddForeignKey
ALTER TABLE "UserInChats" ADD CONSTRAINT "UserInChats_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInChats" ADD CONSTRAINT "UserInChats_chatName_fkey" FOREIGN KEY ("chatName") REFERENCES "Chat"("name") ON DELETE CASCADE ON UPDATE CASCADE;
