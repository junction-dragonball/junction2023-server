-- AlterTable
ALTER TABLE `quest` MODIFY `description` VARCHAR(10000) NOT NULL,
    MODIFY `verifyMethod` VARCHAR(2500) NOT NULL,
    MODIFY `shortDescription` VARCHAR(255) NOT NULL;
