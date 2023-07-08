-- CreateTable

CREATE TABLE
    IF NOT EXISTS `player_wheeldata` (
        `player_id` INTEGER NOT NULL,
        `slot` BLOB NOT NULL,
        INDEX `player_id`(`player_id` ASC),
        CONSTRAINT `player_wheeldata_players_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
    ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex

CREATE INDEX
    `slender_account_backup_codes_account_id_fkey` ON `slender_account_backup_codes`(`account_id` ASC);

-- CreateIndex

CREATE INDEX
    `slender_sessions_account_id_fkey` ON `slender_sessions`(`account_id` ASC);

-- CreateIndex

CREATE INDEX
    `slender_news_author_id_fkey` ON `slender_news`(`author_id` ASC);

-- CreateIndex

CREATE INDEX
    `slender_coin_orders_account_id_fkey` ON `slender_coin_orders`(`account_id` ASC);