/*
  Warnings:

  - You are about to drop the column `viewsCount` on the `Redirect` table. All the data in the column will be lost.
  - Added the required column `usesCount` to the `Redirect` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Redirect" DROP COLUMN "viewsCount",
ADD COLUMN     "usesCount" INTEGER NOT NULL;
