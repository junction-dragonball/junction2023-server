/*
  Warnings:

  - You are about to drop the column `createdAt` on the `progress` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `progress` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `quest` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `closeTime` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `openTime` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `restaurant` table. All the data in the column will be lost.
  - Added the required column `instruction` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainImageUrl` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `Quest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainImageUrl` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `progress` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `quest` DROP COLUMN `thumbnail`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `instruction` JSON NOT NULL,
    ADD COLUMN `mainImageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `thumbnailUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `restaurant` DROP COLUMN `address`,
    DROP COLUMN `closeTime`,
    DROP COLUMN `description`,
    DROP COLUMN `openTime`,
    DROP COLUMN `phone`,
    DROP COLUMN `thumbnail`,
    ADD COLUMN `mainImageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `rating` DOUBLE NOT NULL,
    ADD COLUMN `thumbnailUrl` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thumnailUrl` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `restaurantId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
