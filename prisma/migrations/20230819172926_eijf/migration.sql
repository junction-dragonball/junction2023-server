/*
  Warnings:

  - Added the required column `mapImageUrl` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `restaurant` ADD COLUMN `mapImageUrl` VARCHAR(191) NOT NULL;
