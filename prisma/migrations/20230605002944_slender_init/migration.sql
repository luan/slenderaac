/*
  Warnings:

  - The `creation` column on the `accounts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `house_lists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_bosstiary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_charms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_deaths` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_kills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_misc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_prey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_spells` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_stash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_taskhunt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_wheeldata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `tile_store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accounts` ALTER COLUMN `email` DROP DEFAULT,
    DROP COLUMN `creation`,
    ADD COLUMN `creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `house_lists` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_bosstiary` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_charms` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_deaths` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_items` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_kills` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_misc` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_prey` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_spells` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_stash` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_taskhunt` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_wheeldata` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `players` ADD COLUMN `is_main` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `tile_store` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `account_sessions` (
    `id` VARCHAR(191) NOT NULL,
    `expires` BIGINT UNSIGNED NOT NULL,
    `account_id` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `slender_news` (
    `id` VARCHAR(191) NOT NULL,
    `published_at` BIGINT UNSIGNED NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `author_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `accounts_email_unique` ON `accounts`(`email`);

-- CreateIndex
CREATE INDEX `deletion` ON `players`(`deletion`);

-- AddForeignKey
ALTER TABLE `players_online` ADD CONSTRAINT `players_online_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account_sessions` ADD CONSTRAINT `account_sessions_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `slender_news` ADD CONSTRAINT `slender_news_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
