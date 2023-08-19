/*
  Warnings:

  - You are about to drop the column `mainImageUrl` on the `quest` table. All the data in the column will be lost.
  - You are about to drop the column `mainImageUrl` on the `restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `quest` DROP COLUMN `mainImageUrl`;

-- AlterTable
ALTER TABLE `restaurant` DROP COLUMN `mainImageUrl`;
