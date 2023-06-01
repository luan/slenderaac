/*
  Warnings:

  - You are about to alter the column `expires` on the `account_sessions` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedBigInt`.

*/
-- AlterTable
ALTER TABLE `account_sessions` MODIFY `expires` BIGINT UNSIGNED NOT NULL;
