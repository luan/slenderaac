import type { Outfit } from '$lib/outfits';

export type Player = {
	id: number;
	name: string;
	level: number;
	vocation: PlayerVocation;
	sex: PlayerSex;
	pronoun: PlayerPronoun;
	online: boolean;
	deletion: Date | null;
	isMain: boolean;
	townName: string | null;
	lastLogin: Date | null;
} & Outfit;

export type PlayerWithRank = Player & {
	rank: number;
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
		[PlayerSex.Female]: 'Female',
		[PlayerSex.Male]: 'Male',
	}[playerSex];
}

export function pronounString(playerPronoun: PlayerPronoun): string {
	return {
		[PlayerPronoun.Unset]: 'Use my sex',
		[PlayerPronoun.They]: 'They/Them',
		[PlayerPronoun.She]: 'She/Her',
		[PlayerPronoun.He]: 'He/Him',
		[PlayerPronoun.Ze]: 'Ze/Zir',
		[PlayerPronoun.Name]: 'Use my name',
	}[playerPronoun];
}

export function vocationString(playerVocation: PlayerVocation): string {
	return {
		[PlayerVocation.None]: 'None',
		[PlayerVocation.Sorcerer]: 'Sorcerer',
		[PlayerVocation.Druid]: 'Druid',
		[PlayerVocation.Paladin]: 'Paladin',
		[PlayerVocation.Knight]: 'Knight',
		[PlayerVocation.MasterSorcerer]: 'Master Sorcerer',
		[PlayerVocation.ElderDruid]: 'Elder Druid',
		[PlayerVocation.RoyalPaladin]: 'Royal Paladin',
		[PlayerVocation.EliteKnight]: 'Elite Knight',
	}[playerVocation];
}

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
