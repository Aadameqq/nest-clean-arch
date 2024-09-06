/*
  Warnings:

  - You are about to drop the `Redirect` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Redirect" DROP CONSTRAINT "Redirect_ownerId_fkey";

-- DropTable
DROP TABLE "Redirect";

-- CreateTable
CREATE TABLE "Redirection" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "usesCount" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Redirection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Redirection" ADD CONSTRAINT "Redirection_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
