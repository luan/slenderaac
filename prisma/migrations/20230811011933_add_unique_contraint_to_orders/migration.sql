/*
  Warnings:

  - A unique constraint covering the columns `[amount,currency]` on the table `slender_coin_offers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `slender_coin_offers_amount_currency_key` ON `slender_coin_offers`(`amount`, `currency`);
