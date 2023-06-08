-- AlterTable
ALTER TABLE `slender_static_pages` ADD COLUMN `order` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `players_online` ADD CONSTRAINT `players_online_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
