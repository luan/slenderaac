-- DropForeignKey

ALTER TABLE
    `slender_email_verifications` DROP FOREIGN KEY `slender_email_verifications_account_id_fkey`;

ALTER TABLE
    `slender_email_verifications` DROP CONSTRAINT `slender_email_verifications_account_id_key`;