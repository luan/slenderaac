/*
  Warnings:

  - You are about to drop the column `web` on the `account_sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `account_sessions` DROP COLUMN `web`;

-- CreateTable
CREATE TABLE `slender_sessions` (
    `id` VARCHAR(191) NOT NULL,
    `expires` BIGINT UNSIGNED NOT NULL,
    `account_id` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `players_online` ADD CONSTRAINT `players_online_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `slender_sessions` ADD CONSTRAINT `slender_sessions_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
