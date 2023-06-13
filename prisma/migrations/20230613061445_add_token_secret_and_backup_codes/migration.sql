-- AlterTable
ALTER TABLE `accounts` ADD COLUMN `token_secret` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `slender_account_backup_codes` (
    `id` VARCHAR(191) NOT NULL,
    `account_id` INTEGER UNSIGNED NOT NULL,
    `code` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `slender_account_backup_codes` ADD CONSTRAINT `slender_account_backup_codes_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
