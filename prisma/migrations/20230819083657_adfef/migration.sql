/*
  Warnings:

  - Added the required column `unitReward` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `progress` ADD COLUMN `unitReward` INTEGER NOT NULL;
