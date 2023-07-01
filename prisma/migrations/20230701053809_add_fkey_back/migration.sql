-- AddForeignKey
ALTER TABLE `slender_email_verifications` ADD CONSTRAINT `slender_email_verifications_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
