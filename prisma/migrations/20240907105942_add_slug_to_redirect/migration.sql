/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Redirection` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Redirection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Redirection" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Redirection_slug_key" ON "Redirection"("slug");
