/*
  Warnings:

  - Added the required column `new_email` to the `slender_email_verifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `slender_email_verifications` ADD COLUMN `new_email` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `players_online` ADD CONSTRAINT `players_online_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
