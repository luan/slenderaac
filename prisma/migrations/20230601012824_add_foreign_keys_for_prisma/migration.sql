/*
  Warnings:

  - Added the required column `id` to the `house_lists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_bosstiary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_charms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_deaths` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_kills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_misc` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_prey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_spells` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_stash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_taskhunt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `player_wheeldata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `tile_store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `house_lists` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_bosstiary` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_charms` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_deaths` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_items` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_kills` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_misc` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_prey` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_spells` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_stash` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_taskhunt` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `player_wheeldata` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tile_store` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
