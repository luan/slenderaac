-- AlterTable
ALTER TABLE `accounts` ADD COLUMN `is_verified` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `slender_password_resets` (
    `token` VARCHAR(191) NOT NULL,
    `account_id` INTEGER UNSIGNED NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `slender_password_resets_account_id_key`(`account_id`),
    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `slender_email_verifications` (
    `token` VARCHAR(191) NOT NULL,
    `account_id` INTEGER UNSIGNED NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `slender_email_verifications_account_id_key`(`account_id`),
    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `players_online` ADD CONSTRAINT `players_online_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `slender_password_resets` ADD CONSTRAINT `slender_password_resets_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `slender_email_verifications` ADD CONSTRAINT `slender_email_verifications_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
