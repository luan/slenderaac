-- AlterTable

ALTER TABLE
    `accounts` DROP COLUMN `creation`,
ADD
    COLUMN `creation` INTEGER NOT NULL DEFAULT 0;

ALTER TABLE `accounts`
ADD
    COLUMN `premdays_purchased` int(11) NOT NULL DEFAULT 0;