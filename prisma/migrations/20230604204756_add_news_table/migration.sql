-- CreateTable
CREATE TABLE `slender_news` (
    `id` VARCHAR(191) NOT NULL,
    `published` BIGINT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `author_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `slender_news` ADD CONSTRAINT `slender_news_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `players`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
