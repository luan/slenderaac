/*
  Warnings:

  - You are about to alter the column `published` on the `slender_news` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `TinyInt`.
  - Added the required column `published_at` to the `slender_news` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `slender_news` ADD COLUMN `published_at` BIGINT UNSIGNED NOT NULL,
    MODIFY `published` BOOLEAN NOT NULL DEFAULT false;
