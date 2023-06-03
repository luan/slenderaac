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

export function sexString(playerSex: PlayerSex): string {
	return {
		[PlayerSex.Female]: 'Female',
		[PlayerSex.Male]: 'Male',
	}[playerSex];
}

export function pronounString(playerPronoun: PlayerPronoun): string {
	return {
		[PlayerPronoun.Unset]: 'Use my sex',
		[PlayerPronoun.They]: 'They',
		[PlayerPronoun.She]: 'She',
		[PlayerPronoun.He]: 'He',
		[PlayerPronoun.Ze]: 'Ze',
		[PlayerPronoun.Name]: 'Use my name',
	}[playerPronoun];
}
