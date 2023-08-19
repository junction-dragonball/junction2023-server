-- AlterTable
ALTER TABLE `restaurant` ADD COLUMN `naverMapId` VARCHAR(191) NULL,
    MODIFY `kakaoMapId` VARCHAR(191) NULL;
