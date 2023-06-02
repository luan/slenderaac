/*
  Warnings:

  - The `creation` column on the `accounts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `accounts` DROP COLUMN `creation`,
    ADD COLUMN `creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
