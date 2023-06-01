/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `accounts` ALTER COLUMN `email` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `accounts_email_unique` ON `accounts`(`email`);
