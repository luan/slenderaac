-- AddForeignKey
ALTER TABLE `players` ADD CONSTRAINT `players_town_fk` FOREIGN KEY (`town_id`) REFERENCES `towns`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `players_online` ADD CONSTRAINT `players_online_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
