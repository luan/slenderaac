-- AlterTable
ALTER TABLE `guilds` ADD COLUMN `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `image_url` VARCHAR(191) NULL;
