import type { PlayerSettings } from '@prisma/client';

import type { GuildMembership } from '$lib/guilds';
import type { Outfit } from '$lib/outfits';
import { $_ } from '$lib/utils';

export type Skills = {
	magic: number;
	fist: number;
	club: number;
	sword: number;
	axe: number;
	distance: number;
	shielding: number;
	fishing: number;
};

export type Player = {
	id: number;
	name: string;
	level: number;
	experience?: bigint;
	balance: number;
	vocation: PlayerVocation;
	sex: PlayerSex;
	pronoun: PlayerPronoun;
	online: boolean;
	deletion: Date | null;
	isMain: boolean;
	townName: string | null;
	lastLogin: Date | null;

	guild?: GuildMembership | null;
	guildInvtes: string[];

	settings?: PlayerSettings;
} & Outfit;

export type PlayerWithRank = Player & {
	rank: number;
	skill: string;
};

export enum PlayerSex {
	Female = 0,
	Male,
}

export enum PlayerPronoun {
	Unset = 0,
	They,
	She,
	He,
	Ze,
	Name,
}

export enum PlayerVocation {
	None = 0,
	Sorcerer,
	Druid,
	Paladin,
	Knight,
	MasterSorcerer,
	ElderDruid,
	RoyalPaladin,
	EliteKnight,
}

export function vocationIds(vocation: string): PlayerVocation[] {
	switch (vocation.toLowerCase()) {
		case 'none':
			return [PlayerVocation.None];
		case 'sorcerer':
			return [PlayerVocation.Sorcerer, PlayerVocation.MasterSorcerer];
		case 'druid':
			return [PlayerVocation.Druid, PlayerVocation.ElderDruid];
		case 'paladin':
			return [PlayerVocation.Paladin, PlayerVocation.RoyalPaladin];
		case 'knight':
			return [PlayerVocation.Knight, PlayerVocation.EliteKnight];
		default:
			return [];
	}
}

export enum PlayerGroup {
	Normal = 1,
	Tutor,
	Seniortutor,
	Gamemaster,
	Communitymanager,
	God,
}

export const allPronouns = [
	PlayerPronoun.Unset,
	PlayerPronoun.They,
	PlayerPronoun.She,
	PlayerPronoun.He,
	PlayerPronoun.Ze,
	PlayerPronoun.Name,
];

export function parsePlayerSex(value: unknown): PlayerSex {
	if (typeof value === 'string') {
		value = parseInt(value);
	}
	if (isPlayerSex(value)) {
		return value;
	}
	return PlayerSex.Female;
}

export function parsePlayerPronoun(value: unknown): PlayerPronoun {
	if (typeof value === 'string') {
		value = parseInt(value);
	}
	if (isPlayerPronoun(value)) {
		return value;
	}
	return PlayerPronoun.Unset;
}

export function isPlayerSex(value: unknown): value is PlayerSex {
	return (
		typeof value === 'number' &&
		(value === PlayerSex.Female || value === PlayerSex.Male)
	);
}

export function isPlayerPronoun(value: unknown): value is PlayerPronoun {
	return (
		typeof value === 'number' &&
		(value === PlayerPronoun.Unset ||
			value === PlayerPronoun.They ||
			value === PlayerPronoun.She ||
			value === PlayerPronoun.He ||
			value === PlayerPronoun.Ze ||
			value === PlayerPronoun.Name)
	);
}

export function isPlayerVocation(value: unknown): value is PlayerVocation {
	return (
		typeof value === 'number' &&
		(value === PlayerVocation.None ||
			value === PlayerVocation.Sorcerer ||
			value === PlayerVocation.Druid ||
			value === PlayerVocation.Paladin ||
			value === PlayerVocation.Knight ||
			value === PlayerVocation.MasterSorcerer ||
			value === PlayerVocation.ElderDruid ||
			value === PlayerVocation.RoyalPaladin ||
			value === PlayerVocation.EliteKnight)
	);
}

export function sexString(playerSex: PlayerSex): string {
	return {
		[PlayerSex.Female]: $_('sexes.female'),
		[PlayerSex.Male]: $_('sexes.male'),
	}[playerSex];
}

export function pronounString(playerPronoun: PlayerPronoun): string {
	return {
		[PlayerPronoun.Unset]: $_('pronouns.unset'),
		[PlayerPronoun.They]: $_('pronouns.they'),
		[PlayerPronoun.She]: $_('pronouns.she'),
		[PlayerPronoun.He]: $_('pronouns.he'),
		[PlayerPronoun.Ze]: $_('pronouns.ze'),
		[PlayerPronoun.Name]: $_('pronouns.name'),
	}[playerPronoun];
}

export function vocationString(playerVocation: PlayerVocation): string {
	return {
		[PlayerVocation.None]: $_('vocations.none'),
		[PlayerVocation.Sorcerer]: $_('vocations.sorcerer'),
		[PlayerVocation.Druid]: $_('vocations.druid'),
		[PlayerVocation.Paladin]: $_('vocations.paladin'),
		[PlayerVocation.Knight]: $_('vocations.knight'),
		[PlayerVocation.MasterSorcerer]: $_('vocations.master-sorcerer'),
		[PlayerVocation.ElderDruid]: $_('vocations.elder-druid'),
		[PlayerVocation.RoyalPaladin]: $_('vocations.royal-paladin'),
		[PlayerVocation.EliteKnight]: $_('vocations.elite-knight'),
	}[playerVocation];
}

const validOutfitKeys = [
	'looktype',
	'lookaddons',
	'lookhead',
	'lookbody',
	'looklegs',
	'lookfeet',
	'mount',
	'resize',
];

export function outfitURL({
	resize,
	...params
}: {
	looktype: number;
	lookaddons?: number;
	lookhead?: number;
	lookbody?: number;
	looklegs?: number;
	lookfeet?: number;
	mount?: number;
	resize?: boolean;
}): string {
	const search = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (!validOutfitKeys.includes(key)) {
			continue;
		}
		search.append(key, (value ?? 0).toString());
	}
	if (resize) {
		search.append('resize', '1');
	}
	return `/api/outfits?${search.toString()}`;
}

export function getPronoun(character: {
	pronoun: PlayerPronoun;
	name: string;
	sex: PlayerSex;
}) {
	if (character.pronoun === PlayerPronoun.Name) {
		return character.name;
	}
	const pronoun =
		character.pronoun > 0
			? character.pronoun
			: character.sex === PlayerSex.Female
			? PlayerPronoun.She
			: PlayerPronoun.He;
	return pronounString(pronoun);
}
