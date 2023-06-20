/*
  Warnings:

  - You are about to drop the `account_sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `account_sessions` DROP FOREIGN KEY `account_sessions_account_id_fkey`;

-- DropTable
DROP TABLE `account_sessions`;
