/*
  Warnings:

  - You are about to drop the column `adminId` on the `Chat` table. All the data in the column will be lost.
  - Added the required column `adminEmail` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_adminId_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "adminId",
ADD COLUMN     "adminEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_adminEmail_fkey" FOREIGN KEY ("adminEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
