/*
  Warnings:

  - Added the required column `shortDescription` to the `Quest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `quest` ADD COLUMN `shortDescription` VARCHAR(191) NOT NULL,
    MODIFY `instruction` VARCHAR(191) NOT NULL;
