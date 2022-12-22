/*
  Warnings:

  - You are about to drop the column `adminEmail` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the `_ChatToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Permissao" AS ENUM ('ADMIN', 'MEMBER');

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_adminEmail_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_B_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "adminEmail";

-- DropTable
DROP TABLE "_ChatToUser";

-- CreateTable
CREATE TABLE "UserInChats" (
    "id" SERIAL NOT NULL,
    "permissao" "Permissao" NOT NULL DEFAULT 'MEMBER',
    "userId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserInChats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserInChats" ADD CONSTRAINT "UserInChats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInChats" ADD CONSTRAINT "UserInChats_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
