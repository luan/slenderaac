-- CreateTable
CREATE TABLE `slender_coin_offers` (
    `id` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL DEFAULT 0,
    `price` DECIMAL(65, 30) NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'USD',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `slender_coin_orders` (
    `id` VARCHAR(191) NOT NULL,
    `account_id` INTEGER UNSIGNED NOT NULL,
    `amount` INTEGER NOT NULL DEFAULT 0,
    `price` DECIMAL(65, 30) NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'USD',
    `created_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `players_online` ADD CONSTRAINT `players_online_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `slender_coin_orders` ADD CONSTRAINT `slender_coin_orders_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add base offers
INSERT INTO `slender_coin_offers` (`id`, `amount`, `price`, `currency`) VALUES (uuid(), 100, 1.99, 'USD');
INSERT INTO `slender_coin_offers` (`id`, `amount`, `price`, `currency`) VALUES (uuid(), 250, 4.99, 'USD');
INSERT INTO `slender_coin_offers` (`id`, `amount`, `price`, `currency`) VALUES (uuid(), 600, 9.99, 'USD');
INSERT INTO `slender_coin_offers` (`id`, `amount`, `price`, `currency`) VALUES (uuid(), 1600, 24.99, 'USD');
INSERT INTO `slender_coin_offers` (`id`, `amount`, `price`, `currency`) VALUES (uuid(), 3400, 49.99, 'USD');
INSERT INTO `slender_coin_offers` (`id`, `amount`, `price`, `currency`) VALUES (uuid(), 7000, 99.99, 'USD');


