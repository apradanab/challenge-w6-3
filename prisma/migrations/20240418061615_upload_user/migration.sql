/*
  Warnings:

  - Added the required column `sponsorId` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "sponsorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
