-- DropForeignKey
ALTER TABLE `account_sessions` DROP FOREIGN KEY `account_sessions_account_id_fkey`;

-- AlterTable
ALTER TABLE `player_wheeldata` ADD PRIMARY KEY (`player_id`);

-- AlterTable
ALTER TABLE `slender_email_verifications` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `account_sessions` ADD CONSTRAINT `account_sessions_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
