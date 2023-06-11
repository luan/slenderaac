-- DropForeignKey
ALTER TABLE `slender_coin_orders` DROP FOREIGN KEY `slender_coin_orders_account_id_fkey`;

-- DropForeignKey
ALTER TABLE `slender_email_verifications` DROP FOREIGN KEY `slender_email_verifications_account_id_fkey`;

-- DropForeignKey
ALTER TABLE `slender_password_resets` DROP FOREIGN KEY `slender_password_resets_account_id_fkey`;

-- CreateTable
CREATE TABLE `slender_player_settings` (
    `id` VARCHAR(191) NOT NULL,
    `player_id` INTEGER NOT NULL,
    `hidden` BOOLEAN NOT NULL DEFAULT false,
    `comment` TEXT NULL,
    `show_skills` BOOLEAN NOT NULL DEFAULT true,
    `show_inventory` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `slender_player_settings_player_id_key`(`player_id`),
    INDEX `player_id`(`player_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `players_online` ADD CONSTRAINT `players_online_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `slender_coin_orders` ADD CONSTRAINT `slender_coin_orders_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `slender_password_resets` ADD CONSTRAINT `slender_password_resets_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `slender_email_verifications` ADD CONSTRAINT `slender_email_verifications_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `slender_player_settings` ADD CONSTRAINT `slender_player_settings_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
