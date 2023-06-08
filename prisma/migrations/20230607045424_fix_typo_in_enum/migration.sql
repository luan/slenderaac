/*
  Warnings:

  - The values [CANCELLED] on the enum `slender_coin_orders_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `slender_coin_orders` MODIFY `status` ENUM('PENDING', 'FAILED_ATTEMPT', 'COMPLETED', 'CANCELED') NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE `players_online` ADD CONSTRAINT `players_online_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
