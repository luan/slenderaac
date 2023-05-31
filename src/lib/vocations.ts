export type VocationId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Vocation =
	| 'None'
	| 'Sorcerer'
	| 'Druid'
	| 'Paladin'
	| 'Knight'
	| 'Master Sorcerer'
	| 'Elder Druid'
	| 'Royal Paladin'
	| 'Elite Knight';

export const isVocationId = (value: unknown): value is VocationId =>
	typeof value === 'number' && value >= 0 && value <= 8;

export const vocationMap: Record<VocationId, Vocation> = {
	0: 'None',
	1: 'Sorcerer',
	2: 'Druid',
	3: 'Paladin',
	4: 'Knight',
	5: 'Master Sorcerer',
	6: 'Elder Druid',
	7: 'Royal Paladin',
	8: 'Elite Knight',
};
