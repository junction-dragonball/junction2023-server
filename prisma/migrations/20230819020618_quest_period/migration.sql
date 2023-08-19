/*
  Warnings:

  - You are about to drop the column `endDate` on the `quest` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `quest` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `Quest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `progress` ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `quest` DROP COLUMN `endDate`,
    DROP COLUMN `startDate`,
    ADD COLUMN `period` INTEGER NOT NULL;
