-- AlterTable
ALTER TABLE `slender_email_verifications` MODIFY `new_email` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `players_online` ADD CONSTRAINT `players_online_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
