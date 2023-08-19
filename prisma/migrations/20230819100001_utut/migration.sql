/*
  Warnings:

  - Added the required column `discountPrice` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `editorComment` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalPrice` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `restaurant` ADD COLUMN `discountPrice` INTEGER NOT NULL,
    ADD COLUMN `editorComment` VARCHAR(191) NOT NULL,
    ADD COLUMN `originalPrice` INTEGER NOT NULL;
