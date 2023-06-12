-- AlterTable
ALTER TABLE `account_sessions` ADD COLUMN `web` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `players_online` ADD CONSTRAINT `players_online_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
