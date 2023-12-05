/*
  Warnings:

  - You are about to alter the column `creation` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.
  - A unique constraint covering the columns `[email]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[player_id]` on the table `player_bosstiary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[player_guid]` on the table `player_charms` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[player_id,time]` on the table `player_deaths` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[player_id,time,target]` on the table `player_kills` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[player_id]` on the table `player_misc` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `tile_store` table without a default value. This is not possible if the table is not empty.

*/
DROP PROCEDURE IF EXISTS AddColumnIfNotExists;
DROP PROCEDURE IF EXISTS AddIndexIfNotExists;
DROP PROCEDURE IF EXISTS AddForeignKeyIfNotExists;

ALTER TABLE `accounts` ALTER COLUMN `email` DROP DEFAULT,
    MODIFY `creation` INTEGER NOT NULL DEFAULT 0;

CREATE PROCEDURE AddColumnIfNotExists(
    IN tableName VARCHAR(255),
    IN fieldName VARCHAR(255),
    IN fieldDef TEXT
)
BEGIN
    IF NOT EXISTS (
        SELECT * FROM information_schema.COLUMNS
        WHERE COLUMN_NAME=fieldName
        AND TABLE_NAME=tableName
        AND TABLE_SCHEMA=DATABASE()
    )
    THEN
        SET @ddl=CONCAT('ALTER TABLE ', tableName, ' ADD COLUMN `', fieldName, '` ', fieldDef);
        PREPARE stmt FROM @ddl;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END;

CREATE PROCEDURE AddIndexIfNotExists(
    IN tableName VARCHAR(255),
    IN indexName VARCHAR(255),
    IN uniqueIndex BOOLEAN,
    IN indexColumns VARCHAR(255)
)
BEGIN
    SET @dbname = DATABASE();
    SET @index_exists = (
        SELECT COUNT(*)
        FROM information_schema.statistics
        WHERE table_schema = @dbname
        AND table_name = tableName
        AND index_name = indexName
    );

    IF @index_exists = 0 THEN
        SET @ddl = CONCAT('ALTER TABLE ', tableName, ' ADD ');
        IF uniqueIndex THEN
            SET @ddl = CONCAT(@ddl, 'UNIQUE ');
        END IF;
        SET @ddl = CONCAT(@ddl, 'INDEX ', indexName, '(', indexColumns, ')');
        PREPARE stmt FROM @ddl;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END;

CREATE PROCEDURE AddForeignKeyIfNotExists(
    IN tableName VARCHAR(255),
    IN constraintName VARCHAR(255),
    IN foreignKeyName VARCHAR(255),
    IN referenceTableName VARCHAR(255),
    IN referenceKeyName VARCHAR(255),
    IN onDeleteAction VARCHAR(255),
    IN onUpdateAction VARCHAR(255)
)
BEGIN
    SET @dbname = DATABASE();
    SET @fk_exists = (
        SELECT COUNT(*)
        FROM information_schema.table_constraints
        WHERE constraint_schema = @dbname
        AND table_name = tableName
        AND constraint_name = constraintName
    );

    IF @fk_exists = 0 THEN
        SET @ddl = CONCAT('ALTER TABLE ', tableName, 
                          ' ADD CONSTRAINT ', constraintName, 
                          ' FOREIGN KEY (', foreignKeyName, 
                          ') REFERENCES ', referenceTableName, 
                          '(', referenceKeyName, ')',
                          ' ON DELETE ', onDeleteAction,
                          ' ON UPDATE ', onUpdateAction);
        PREPARE stmt FROM @ddl;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END;

CALL AddColumnIfNotExists('accounts', 'is_verified', 'BOOLEAN NOT NULL DEFAULT false');
CALL AddColumnIfNotExists('accounts', 'token_secret', 'VARCHAR(255) NULL');
CALL AddColumnIfNotExists('accounts', 'creation', 'INTEGER NOT NULL DEFAULT 0');

CALL AddColumnIfNotExists('guild_ranks', 'order', 'INTEGER NOT NULL DEFAULT 0');


CALL AddColumnIfNotExists('guilds', 'created_at', 'DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0)');
CALL AddColumnIfNotExists('guilds', 'description', 'TEXT NULL');
CALL AddColumnIfNotExists('guilds', 'image_url', 'VARCHAR(191) NULL');


-- AlterTable
-- ALTER TABLE `players` ADD COLUMN `is_main` BOOLEAN NOT NULL DEFAULT false;
CALL AddColumnIfNotExists('players', 'is_main', 'BOOLEAN NOT NULL DEFAULT false');

CALL AddColumnIfNotExists('tile_store', 'id', 'INTEGER NOT NULL AUTO_INCREMENT, ADD PRIMARY KEY (`id`)');

-- AlterTable
CALL AddColumnIfNotExists('towns', 'starter', 'BOOLEAN NOT NULL DEFAULT false');

-- CreateTable
CREATE TABLE IF NOT EXISTS `monsters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `lookbody` INTEGER NOT NULL DEFAULT 0,
    `lookfeet` INTEGER NOT NULL DEFAULT 0,
    `lookhead` INTEGER NOT NULL DEFAULT 0,
    `looklegs` INTEGER NOT NULL DEFAULT 0,
    `looktype` INTEGER NOT NULL DEFAULT 136,
    `lookaddons` INTEGER NOT NULL DEFAULT 0,
    `lookmount` INTEGER NOT NULL DEFAULT 0,
    `looktypeex` INTEGER NOT NULL DEFAULT 0,
    `raceid` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `slender_account_backup_codes` (
    `id` VARCHAR(191) NOT NULL,
    `account_id` INTEGER UNSIGNED NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,

    INDEX `slender_account_backup_codes_account_id_fkey`(`account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `slender_coin_offers` (
    `id` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL DEFAULT 0,
    `price` DECIMAL(65, 30) NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'USD',

    UNIQUE INDEX `slender_coin_offers_amount_currency_key`(`amount`, `currency`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `slender_coin_orders` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'FAILED_ATTEMPT', 'COMPLETED', 'CANCELED') NOT NULL DEFAULT 'PENDING',
    `account_id` INTEGER UNSIGNED NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'USD',
    `amount` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `payment_token` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `slender_coin_orders_payment_token_key`(`payment_token`),
    INDEX `slender_coin_orders_account_id_fkey`(`account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `slender_currency_exchange_rates` (
    `currency` VARCHAR(191) NOT NULL,
    `rate` DECIMAL(65, 30) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`currency`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `slender_email_verifications` (
    `token` VARCHAR(191) NOT NULL,
    `account_id` INTEGER UNSIGNED NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `new_email` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `slender_email_verifications_account_id_fkey`(`account_id`),
    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `slender_news` (
    `id` VARCHAR(191) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `author_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `slender_news_author_id_fkey`(`author_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `slender_password_resets` (
    `token` VARCHAR(191) NOT NULL,
    `account_id` INTEGER UNSIGNED NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `slender_password_resets_account_id_key`(`account_id`),
    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `slender_player_settings` (
    `id` VARCHAR(191) NOT NULL,
    `player_id` INTEGER NOT NULL,
    `hidden` BOOLEAN NOT NULL DEFAULT false,
    `show_skills` BOOLEAN NOT NULL DEFAULT true,
    `show_inventory` BOOLEAN NOT NULL DEFAULT true,
    `comment` TEXT NULL,

    UNIQUE INDEX `slender_player_settings_player_id_key`(`player_id`),
    INDEX `player_id`(`player_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `slender_sessions` (
    `id` VARCHAR(191) NOT NULL,
    `expires` BIGINT UNSIGNED NOT NULL,
    `account_id` INTEGER UNSIGNED NOT NULL,

    INDEX `slender_sessions_account_id_fkey`(`account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE IF NOT EXISTS `slender_static_pages` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `order` INTEGER NOT NULL DEFAULT 0,
    `hide` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `slender_static_pages_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CALL AddIndexIfNotExists('account_sessions', 'account_sessions_account_id_fkey', FALSE, 'account_id');
CALL AddIndexIfNotExists('accounts', 'accounts_email_unique', TRUE, 'email');
CALL AddIndexIfNotExists('player_bosstiary', 'player_bosstiary_unique', TRUE, 'player_id');
CALL AddIndexIfNotExists('player_charms', 'player_charms_unique', TRUE, 'player_guid');
CALL AddIndexIfNotExists('player_deaths', 'player_deaths_unique', TRUE, 'player_id, time');
CALL AddIndexIfNotExists('player_kills', 'player_kills_unique', TRUE, 'player_id, time, target');
CALL AddIndexIfNotExists('player_misc', 'player_misc_unique', TRUE, 'player_id');
CALL AddIndexIfNotExists('players', 'deletion', FALSE, 'deletion');

CALL AddForeignKeyIfNotExists('players_online', 'players_online_player_id_fkey', 'player_id', 'players', 'id', 'RESTRICT', 'CASCADE');
CALL AddForeignKeyIfNotExists('account_sessions', 'account_sessions_account_id_fkey', 'account_id', 'accounts', 'id', 'CASCADE', 'NO ACTION');
CALL AddForeignKeyIfNotExists('slender_account_backup_codes', 'slender_account_backup_codes_account_id_fkey', 'account_id', 'accounts', 'id', 'CASCADE', 'NO ACTION');
CALL AddForeignKeyIfNotExists('slender_coin_orders', 'slender_coin_orders_account_id_fkey', 'account_id', 'accounts', 'id', 'CASCADE', 'NO ACTION');
CALL AddForeignKeyIfNotExists('slender_email_verifications', 'slender_email_verifications_account_id_fkey', 'account_id', 'accounts', 'id', 'CASCADE', 'NO ACTION');
CALL AddForeignKeyIfNotExists('slender_news', 'slender_news_author_id_fkey', 'author_id', 'players', 'id', 'RESTRICT', 'CASCADE');
CALL AddForeignKeyIfNotExists('slender_password_resets', 'slender_password_resets_account_id_fkey', 'account_id', 'accounts', 'id', 'CASCADE', 'NO ACTION');
CALL AddForeignKeyIfNotExists('slender_player_settings', 'slender_player_settings_player_id_fkey', 'player_id', 'players', 'id', 'CASCADE', 'NO ACTION');
CALL AddForeignKeyIfNotExists('slender_sessions', 'slender_sessions_account_id_fkey', 'account_id', 'accounts', 'id', 'CASCADE', 'CASCADE');

DROP PROCEDURE IF EXISTS AddColumnIfNotExists;
DROP PROCEDURE IF EXISTS AddIndexIfNotExists;
DROP PROCEDURE IF EXISTS AddForeignKeyIfNotExists;