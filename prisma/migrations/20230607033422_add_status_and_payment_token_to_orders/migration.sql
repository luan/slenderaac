/*
  Warnings:

  - A unique constraint covering the columns `[payment_token]` on the table `slender_coin_orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payment_token` to the `slender_coin_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `slender_coin_orders` ADD COLUMN `payment_token` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('PENDING', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX `slender_coin_orders_payment_token_key` ON `slender_coin_orders`(`payment_token`);

-- AddForeignKey
ALTER TABLE `players_online` ADD CONSTRAINT `players_online_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
