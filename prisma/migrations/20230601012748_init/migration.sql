-- CreateTable
CREATE TABLE `account_ban_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER UNSIGNED NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `banned_at` BIGINT NOT NULL,
    `expired_at` BIGINT NOT NULL,
    `banned_by` INTEGER NOT NULL,

    INDEX `account_id`(`account_id`),
    INDEX `banned_by`(`banned_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_bans` (
    `account_id` INTEGER UNSIGNED NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `banned_at` BIGINT NOT NULL,
    `expires_at` BIGINT NOT NULL,
    `banned_by` INTEGER NOT NULL,

    INDEX `banned_by`(`banned_by`),
    PRIMARY KEY (`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_viplist` (
    `account_id` INTEGER UNSIGNED NOT NULL,
    `player_id` INTEGER NOT NULL,
    `description` VARCHAR(128) NOT NULL DEFAULT '',
    `icon` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `notify` BOOLEAN NOT NULL DEFAULT false,

    INDEX `account_id`(`account_id`),
    INDEX `player_id`(`player_id`),
    UNIQUE INDEX `account_viplist_unique`(`account_id`, `player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,
    `password` CHAR(40) NOT NULL,
    `email` VARCHAR(255) NOT NULL DEFAULT '',
    `premdays` INTEGER NOT NULL DEFAULT 0,
    `lastday` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `type` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `coins` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `coins_transferable` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `tournament_coins` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `creation` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `recruiter` INTEGER NULL DEFAULT 0,

    UNIQUE INDEX `accounts_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `boosted_boss` (
    `looktype` INTEGER NOT NULL DEFAULT 136,
    `lookfeet` INTEGER NOT NULL DEFAULT 0,
    `looklegs` INTEGER NOT NULL DEFAULT 0,
    `lookhead` INTEGER NOT NULL DEFAULT 0,
    `lookbody` INTEGER NOT NULL DEFAULT 0,
    `lookaddons` INTEGER NOT NULL DEFAULT 0,
    `lookmount` INTEGER NULL DEFAULT 0,
    `date` VARCHAR(250) NOT NULL DEFAULT '',
    `boostname` TEXT NULL,
    `raceid` VARCHAR(250) NOT NULL DEFAULT '',

    PRIMARY KEY (`date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `boosted_creature` (
    `looktype` INTEGER NOT NULL DEFAULT 136,
    `lookfeet` INTEGER NOT NULL DEFAULT 0,
    `looklegs` INTEGER NOT NULL DEFAULT 0,
    `lookhead` INTEGER NOT NULL DEFAULT 0,
    `lookbody` INTEGER NOT NULL DEFAULT 0,
    `lookaddons` INTEGER NOT NULL DEFAULT 0,
    `lookmount` INTEGER NULL DEFAULT 0,
    `date` VARCHAR(250) NOT NULL DEFAULT '',
    `boostname` TEXT NULL,
    `raceid` VARCHAR(250) NOT NULL DEFAULT '',

    PRIMARY KEY (`date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coins_transactions` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER UNSIGNED NOT NULL,
    `type` TINYINT UNSIGNED NOT NULL,
    `amount` INTEGER UNSIGNED NOT NULL,
    `description` VARCHAR(3500) NOT NULL,
    `timestamp` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `account_id`(`account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `daily_reward_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `daystreak` SMALLINT NOT NULL DEFAULT 0,
    `player_id` INTEGER NOT NULL,
    `timestamp` INTEGER NOT NULL,
    `description` VARCHAR(255) NULL,

    INDEX `player_id`(`player_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forge_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `player_id` INTEGER NOT NULL,
    `action_type` INTEGER NOT NULL DEFAULT 0,
    `description` TEXT NOT NULL,
    `is_success` TINYINT NOT NULL DEFAULT 0,
    `bonus` TINYINT NOT NULL DEFAULT 0,
    `done_at` BIGINT NOT NULL,
    `done_at_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `cost` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `gained` BIGINT UNSIGNED NOT NULL DEFAULT 0,

    INDEX `player_id`(`player_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `global_storage` (
    `key` VARCHAR(32) NOT NULL,
    `value` TEXT NOT NULL,

    UNIQUE INDEX `global_storage_unique`(`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_invites` (
    `player_id` INTEGER NOT NULL DEFAULT 0,
    `guild_id` INTEGER NOT NULL DEFAULT 0,
    `date` INTEGER NOT NULL,

    INDEX `guild_id`(`guild_id`),
    PRIMARY KEY (`player_id`, `guild_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_membership` (
    `player_id` INTEGER NOT NULL,
    `guild_id` INTEGER NOT NULL,
    `rank_id` INTEGER NOT NULL,
    `nick` VARCHAR(15) NOT NULL DEFAULT '',

    INDEX `guild_id`(`guild_id`),
    INDEX `rank_id`(`rank_id`),
    PRIMARY KEY (`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_ranks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guild_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `level` INTEGER NOT NULL,

    INDEX `guild_id`(`guild_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_wars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guild1` INTEGER NOT NULL DEFAULT 0,
    `guild2` INTEGER NOT NULL DEFAULT 0,
    `name1` VARCHAR(255) NOT NULL,
    `name2` VARCHAR(255) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 0,
    `started` BIGINT NOT NULL DEFAULT 0,
    `ended` BIGINT NOT NULL DEFAULT 0,

    INDEX `guild1`(`guild1`),
    INDEX `guild2`(`guild2`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guilds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` INTEGER NOT NULL DEFAULT 1,
    `name` VARCHAR(255) NOT NULL,
    `ownerid` INTEGER NOT NULL,
    `creationdata` INTEGER NOT NULL,
    `motd` VARCHAR(255) NOT NULL DEFAULT '',
    `residence` INTEGER NOT NULL DEFAULT 0,
    `balance` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `points` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `guilds_name_unique`(`name`),
    UNIQUE INDEX `guilds_owner_unique`(`ownerid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guildwar_kills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `killer` VARCHAR(50) NOT NULL,
    `target` VARCHAR(50) NOT NULL,
    `killerguild` INTEGER NOT NULL DEFAULT 0,
    `targetguild` INTEGER NOT NULL DEFAULT 0,
    `warid` INTEGER NOT NULL DEFAULT 0,
    `time` BIGINT NOT NULL,

    UNIQUE INDEX `guildwar_kills_unique`(`warid`),
    INDEX `warid`(`warid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `house_lists` (
    `house_id` INTEGER NOT NULL,
    `listid` INTEGER NOT NULL,
    `list` TEXT NOT NULL,

    INDEX `house_id`(`house_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `houses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `owner` INTEGER NOT NULL,
    `paid` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `warnings` INTEGER NOT NULL DEFAULT 0,
    `name` VARCHAR(255) NOT NULL,
    `rent` INTEGER NOT NULL DEFAULT 0,
    `town_id` INTEGER NOT NULL DEFAULT 0,
    `bid` INTEGER NOT NULL DEFAULT 0,
    `bid_end` INTEGER NOT NULL DEFAULT 0,
    `last_bid` INTEGER NOT NULL DEFAULT 0,
    `highest_bidder` INTEGER NOT NULL DEFAULT 0,
    `size` INTEGER NOT NULL DEFAULT 0,
    `guildid` INTEGER NULL,
    `beds` INTEGER NOT NULL DEFAULT 0,

    INDEX `owner`(`owner`),
    INDEX `town_id`(`town_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ip_bans` (
    `ip` INTEGER NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `banned_at` BIGINT NOT NULL,
    `expires_at` BIGINT NOT NULL,
    `banned_by` INTEGER NOT NULL,

    INDEX `banned_by`(`banned_by`),
    PRIMARY KEY (`ip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `market_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `player_id` INTEGER NOT NULL,
    `sale` BOOLEAN NOT NULL DEFAULT false,
    `itemtype` INTEGER UNSIGNED NOT NULL,
    `amount` SMALLINT UNSIGNED NOT NULL,
    `price` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `expires_at` BIGINT UNSIGNED NOT NULL,
    `inserted` BIGINT UNSIGNED NOT NULL,
    `state` TINYINT UNSIGNED NOT NULL,
    `tier` TINYINT UNSIGNED NOT NULL DEFAULT 0,

    INDEX `player_id`(`player_id`, `sale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `market_offers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `player_id` INTEGER NOT NULL,
    `sale` BOOLEAN NOT NULL DEFAULT false,
    `itemtype` INTEGER UNSIGNED NOT NULL,
    `amount` SMALLINT UNSIGNED NOT NULL,
    `created` BIGINT UNSIGNED NOT NULL,
    `anonymous` BOOLEAN NOT NULL DEFAULT false,
    `price` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `tier` TINYINT UNSIGNED NOT NULL DEFAULT 0,

    INDEX `created`(`created`),
    INDEX `player_id`(`player_id`),
    INDEX `sale`(`sale`, `itemtype`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_bosstiary` (
    `player_id` INTEGER NOT NULL,
    `bossIdSlotOne` INTEGER NOT NULL DEFAULT 0,
    `bossIdSlotTwo` INTEGER NOT NULL DEFAULT 0,
    `removeTimes` INTEGER NOT NULL DEFAULT 1
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_charms` (
    `player_guid` INTEGER NOT NULL,
    `charm_points` VARCHAR(250) NULL,
    `charm_expansion` BOOLEAN NULL,
    `rune_wound` INTEGER NULL,
    `rune_enflame` INTEGER NULL,
    `rune_poison` INTEGER NULL,
    `rune_freeze` INTEGER NULL,
    `rune_zap` INTEGER NULL,
    `rune_curse` INTEGER NULL,
    `rune_cripple` INTEGER NULL,
    `rune_parry` INTEGER NULL,
    `rune_dodge` INTEGER NULL,
    `rune_adrenaline` INTEGER NULL,
    `rune_numb` INTEGER NULL,
    `rune_cleanse` INTEGER NULL,
    `rune_bless` INTEGER NULL,
    `rune_scavenge` INTEGER NULL,
    `rune_gut` INTEGER NULL,
    `rune_low_blow` INTEGER NULL,
    `rune_divine` INTEGER NULL,
    `rune_vamp` INTEGER NULL,
    `rune_void` INTEGER NULL,
    `UsedRunesBit` VARCHAR(250) NULL,
    `UnlockedRunesBit` VARCHAR(250) NULL,
    `tracker list` BLOB NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_deaths` (
    `player_id` INTEGER NOT NULL,
    `time` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `level` INTEGER NOT NULL DEFAULT 1,
    `killed_by` VARCHAR(255) NOT NULL,
    `is_player` BOOLEAN NOT NULL DEFAULT true,
    `mostdamage_by` VARCHAR(100) NOT NULL,
    `mostdamage_is_player` BOOLEAN NOT NULL DEFAULT false,
    `unjustified` BOOLEAN NOT NULL DEFAULT false,
    `mostdamage_unjustified` BOOLEAN NOT NULL DEFAULT false,

    INDEX `killed_by`(`killed_by`),
    INDEX `mostdamage_by`(`mostdamage_by`),
    INDEX `player_id`(`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_depotitems` (
    `player_id` INTEGER NOT NULL,
    `sid` INTEGER NOT NULL,
    `pid` INTEGER NOT NULL DEFAULT 0,
    `itemtype` INTEGER NOT NULL DEFAULT 0,
    `count` INTEGER NOT NULL DEFAULT 0,
    `attributes` BLOB NOT NULL,

    UNIQUE INDEX `player_depotitems_unique`(`player_id`, `sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_hirelings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `player_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `active` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `sex` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `posx` INTEGER NOT NULL DEFAULT 0,
    `posy` INTEGER NOT NULL DEFAULT 0,
    `posz` INTEGER NOT NULL DEFAULT 0,
    `lookbody` INTEGER NOT NULL DEFAULT 0,
    `lookfeet` INTEGER NOT NULL DEFAULT 0,
    `lookhead` INTEGER NOT NULL DEFAULT 0,
    `looklegs` INTEGER NOT NULL DEFAULT 0,
    `looktype` INTEGER NOT NULL DEFAULT 136,

    INDEX `player_id`(`player_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_inboxitems` (
    `player_id` INTEGER NOT NULL,
    `sid` INTEGER NOT NULL,
    `pid` INTEGER NOT NULL DEFAULT 0,
    `itemtype` INTEGER NOT NULL DEFAULT 0,
    `count` INTEGER NOT NULL DEFAULT 0,
    `attributes` BLOB NOT NULL,

    UNIQUE INDEX `player_inboxitems_unique`(`player_id`, `sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_items` (
    `player_id` INTEGER NOT NULL DEFAULT 0,
    `pid` INTEGER NOT NULL DEFAULT 0,
    `sid` INTEGER NOT NULL DEFAULT 0,
    `itemtype` INTEGER NOT NULL DEFAULT 0,
    `count` INTEGER NOT NULL DEFAULT 0,
    `attributes` BLOB NOT NULL,

    INDEX `player_id`(`player_id`),
    INDEX `sid`(`sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_kills` (
    `player_id` INTEGER NOT NULL,
    `time` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `target` INTEGER NOT NULL,
    `unavenged` BOOLEAN NOT NULL DEFAULT false
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_misc` (
    `player_id` INTEGER NOT NULL,
    `info` BLOB NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_namelocks` (
    `player_id` INTEGER NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `namelocked_at` BIGINT NOT NULL,
    `namelocked_by` INTEGER NOT NULL,

    UNIQUE INDEX `player_namelocks_unique`(`player_id`),
    INDEX `namelocked_by`(`namelocked_by`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_prey` (
    `player_id` INTEGER NOT NULL,
    `slot` BOOLEAN NOT NULL,
    `state` BOOLEAN NOT NULL,
    `raceid` VARCHAR(250) NOT NULL,
    `option` BOOLEAN NOT NULL,
    `bonus_type` BOOLEAN NOT NULL,
    `bonus_rarity` BOOLEAN NOT NULL,
    `bonus_percentage` VARCHAR(250) NOT NULL,
    `bonus_time` VARCHAR(250) NOT NULL,
    `free_reroll` BIGINT NOT NULL,
    `monster_list` BLOB NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_rewards` (
    `player_id` INTEGER NOT NULL,
    `sid` INTEGER NOT NULL,
    `pid` INTEGER NOT NULL DEFAULT 0,
    `itemtype` INTEGER NOT NULL DEFAULT 0,
    `count` INTEGER NOT NULL DEFAULT 0,
    `attributes` BLOB NOT NULL,

    UNIQUE INDEX `player_rewards_unique`(`player_id`, `sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_spells` (
    `player_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    INDEX `player_id`(`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_stash` (
    `player_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `item_count` INTEGER NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_storage` (
    `player_id` INTEGER NOT NULL DEFAULT 0,
    `key` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `value` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`player_id`, `key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_taskhunt` (
    `player_id` INTEGER NOT NULL,
    `slot` BOOLEAN NOT NULL,
    `state` BOOLEAN NOT NULL,
    `raceid` VARCHAR(250) NOT NULL,
    `upgrade` BOOLEAN NOT NULL,
    `rarity` BOOLEAN NOT NULL,
    `kills` VARCHAR(250) NOT NULL,
    `disabled_time` BIGINT NOT NULL,
    `free_reroll` BIGINT NOT NULL,
    `monster_list` BLOB NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `players` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `group_id` INTEGER NOT NULL DEFAULT 1,
    `account_id` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `level` INTEGER NOT NULL DEFAULT 1,
    `vocation` INTEGER NOT NULL DEFAULT 0,
    `health` INTEGER NOT NULL DEFAULT 150,
    `healthmax` INTEGER NOT NULL DEFAULT 150,
    `experience` BIGINT NOT NULL DEFAULT 0,
    `lookbody` INTEGER NOT NULL DEFAULT 0,
    `lookfeet` INTEGER NOT NULL DEFAULT 0,
    `lookhead` INTEGER NOT NULL DEFAULT 0,
    `looklegs` INTEGER NOT NULL DEFAULT 0,
    `looktype` INTEGER NOT NULL DEFAULT 136,
    `lookaddons` INTEGER NOT NULL DEFAULT 0,
    `maglevel` INTEGER NOT NULL DEFAULT 0,
    `mana` INTEGER NOT NULL DEFAULT 0,
    `manamax` INTEGER NOT NULL DEFAULT 0,
    `manaspent` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `soul` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `town_id` INTEGER NOT NULL DEFAULT 1,
    `posx` INTEGER NOT NULL DEFAULT 0,
    `posy` INTEGER NOT NULL DEFAULT 0,
    `posz` INTEGER NOT NULL DEFAULT 0,
    `conditions` BLOB NOT NULL,
    `cap` INTEGER NOT NULL DEFAULT 0,
    `sex` INTEGER NOT NULL DEFAULT 0,
    `pronoun` INTEGER NOT NULL DEFAULT 0,
    `lastlogin` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `lastip` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `save` BOOLEAN NOT NULL DEFAULT true,
    `skull` BOOLEAN NOT NULL DEFAULT false,
    `skulltime` BIGINT NOT NULL DEFAULT 0,
    `lastlogout` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `blessings` TINYINT NOT NULL DEFAULT 0,
    `blessings1` TINYINT NOT NULL DEFAULT 0,
    `blessings2` TINYINT NOT NULL DEFAULT 0,
    `blessings3` TINYINT NOT NULL DEFAULT 0,
    `blessings4` TINYINT NOT NULL DEFAULT 0,
    `blessings5` TINYINT NOT NULL DEFAULT 0,
    `blessings6` TINYINT NOT NULL DEFAULT 0,
    `blessings7` TINYINT NOT NULL DEFAULT 0,
    `blessings8` TINYINT NOT NULL DEFAULT 0,
    `onlinetime` INTEGER NOT NULL DEFAULT 0,
    `deletion` BIGINT NOT NULL DEFAULT 0,
    `balance` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `offlinetraining_time` SMALLINT UNSIGNED NOT NULL DEFAULT 43200,
    `offlinetraining_skill` TINYINT NOT NULL DEFAULT -1,
    `stamina` SMALLINT UNSIGNED NOT NULL DEFAULT 2520,
    `skill_fist` INTEGER UNSIGNED NOT NULL DEFAULT 10,
    `skill_fist_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_club` INTEGER UNSIGNED NOT NULL DEFAULT 10,
    `skill_club_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_sword` INTEGER UNSIGNED NOT NULL DEFAULT 10,
    `skill_sword_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_axe` INTEGER UNSIGNED NOT NULL DEFAULT 10,
    `skill_axe_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_dist` INTEGER UNSIGNED NOT NULL DEFAULT 10,
    `skill_dist_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_shielding` INTEGER UNSIGNED NOT NULL DEFAULT 10,
    `skill_shielding_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_fishing` INTEGER UNSIGNED NOT NULL DEFAULT 10,
    `skill_fishing_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_critical_hit_chance` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `skill_critical_hit_chance_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_critical_hit_damage` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `skill_critical_hit_damage_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_life_leech_chance` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `skill_life_leech_chance_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_life_leech_amount` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `skill_life_leech_amount_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_mana_leech_chance` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `skill_mana_leech_chance_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_mana_leech_amount` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `skill_mana_leech_amount_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_criticalhit_chance` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_criticalhit_damage` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_lifeleech_chance` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_lifeleech_amount` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_manaleech_chance` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_manaleech_amount` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `manashield` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    `max_manashield` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    `xpboost_stamina` SMALLINT NULL,
    `xpboost_value` TINYINT NULL,
    `marriage_status` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `marriage_spouse` INTEGER NOT NULL DEFAULT -1,
    `bonus_rerolls` BIGINT NOT NULL DEFAULT 0,
    `prey_wildcard` BIGINT NOT NULL DEFAULT 0,
    `task_points` BIGINT NOT NULL DEFAULT 0,
    `quickloot_fallback` BOOLEAN NULL DEFAULT false,
    `lookmountbody` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `lookmountfeet` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `lookmounthead` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `lookmountlegs` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `lookfamiliarstype` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `isreward` BOOLEAN NOT NULL DEFAULT true,
    `istutorial` BOOLEAN NOT NULL DEFAULT false,
    `forge_dusts` BIGINT NOT NULL DEFAULT 0,
    `forge_dust_level` BIGINT NOT NULL DEFAULT 100,
    `randomize_mount` BOOLEAN NOT NULL DEFAULT false,
    `boss_points` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `players_unique`(`name`),
    INDEX `account_id`(`account_id`),
    INDEX `vocation`(`vocation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `players_online` (
    `player_id` INTEGER NOT NULL,

    PRIMARY KEY (`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `server_config` (
    `config` VARCHAR(50) NOT NULL,
    `value` VARCHAR(256) NOT NULL DEFAULT '',

    PRIMARY KEY (`config`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER UNSIGNED NOT NULL,
    `mode` SMALLINT NOT NULL DEFAULT 0,
    `description` VARCHAR(3500) NOT NULL,
    `coin_type` BOOLEAN NOT NULL DEFAULT false,
    `coin_amount` INTEGER NOT NULL,
    `time` BIGINT UNSIGNED NOT NULL,
    `timestamp` INTEGER NOT NULL DEFAULT 0,
    `coins` INTEGER NOT NULL DEFAULT 0,

    INDEX `account_id`(`account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tile_store` (
    `house_id` INTEGER NOT NULL,
    `data` LONGBLOB NOT NULL,

    INDEX `house_id`(`house_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `towns` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `posx` INTEGER NOT NULL DEFAULT 0,
    `posy` INTEGER NOT NULL DEFAULT 0,
    `posz` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_wheeldata` (
    `player_id` INTEGER NOT NULL,
    `slot` BLOB NOT NULL,

    INDEX `player_id`(`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `account_ban_history` ADD CONSTRAINT `account_bans_history_account_fk` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account_ban_history` ADD CONSTRAINT `account_bans_history_player_fk` FOREIGN KEY (`banned_by`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account_bans` ADD CONSTRAINT `account_bans_account_fk` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account_bans` ADD CONSTRAINT `account_bans_player_fk` FOREIGN KEY (`banned_by`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account_viplist` ADD CONSTRAINT `account_viplist_account_fk` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `account_viplist` ADD CONSTRAINT `account_viplist_player_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `coins_transactions` ADD CONSTRAINT `coins_transactions_account_fk` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `daily_reward_history` ADD CONSTRAINT `daily_reward_history_player_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `forge_history` ADD CONSTRAINT `forge_history_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `guild_invites` ADD CONSTRAINT `guild_invites_guild_fk` FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `guild_invites` ADD CONSTRAINT `guild_invites_player_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `guild_membership` ADD CONSTRAINT `guild_membership_guild_fk` FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_membership` ADD CONSTRAINT `guild_membership_player_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_membership` ADD CONSTRAINT `guild_membership_rank_fk` FOREIGN KEY (`rank_id`) REFERENCES `guild_ranks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_ranks` ADD CONSTRAINT `guild_ranks_fk` FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `guilds` ADD CONSTRAINT `guilds_ownerid_fk` FOREIGN KEY (`ownerid`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `guildwar_kills` ADD CONSTRAINT `guildwar_kills_warid_fk` FOREIGN KEY (`warid`) REFERENCES `guild_wars`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `house_lists` ADD CONSTRAINT `houses_list_house_fk` FOREIGN KEY (`house_id`) REFERENCES `houses`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ip_bans` ADD CONSTRAINT `ip_bans_players_fk` FOREIGN KEY (`banned_by`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `market_history` ADD CONSTRAINT `market_history_players_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `market_offers` ADD CONSTRAINT `market_offers_players_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_deaths` ADD CONSTRAINT `player_deaths_players_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_depotitems` ADD CONSTRAINT `player_depotitems_players_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_hirelings` ADD CONSTRAINT `player_hirelings_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_inboxitems` ADD CONSTRAINT `player_inboxitems_players_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_items` ADD CONSTRAINT `player_items_players_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_namelocks` ADD CONSTRAINT `player_namelocks_players2_fk` FOREIGN KEY (`namelocked_by`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_namelocks` ADD CONSTRAINT `player_namelocks_players_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_rewards` ADD CONSTRAINT `player_rewards_players_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_spells` ADD CONSTRAINT `player_spells_players_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_storage` ADD CONSTRAINT `player_storage_players_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `players` ADD CONSTRAINT `players_account_fk` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `store_history` ADD CONSTRAINT `store_history_account_fk` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tile_store` ADD CONSTRAINT `tile_store_account_fk` FOREIGN KEY (`house_id`) REFERENCES `houses`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `player_wheeldata` ADD CONSTRAINT `player_wheeldata_players_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
