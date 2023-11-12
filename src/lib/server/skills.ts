import { $_ } from '$lib/utils';

const skillColumns = [
	'experience',
	'maglevel',
	'skill_fist',
	'skill_club',
	'skill_sword',
	'skill_axe',
	'skill_dist',
	'skill_shielding',
	'skill_fishing',
	'balance',
] as const;

const skills = [
	'experience',
	'magic',
	'fist',
	'club',
	'sword',
	'axe',
	'distance',
	'shielding',
	'fishing',
	'balance',
].map((skill) => $_(`skills.${skill}`).toLowerCase());

type SkillColumn = (typeof skillColumns)[number];
type Skill = (typeof skills)[number];

export function isSkill(skill: string): skill is Skill {
	return skills.includes(skill);
}

export function skillToColumn(skill: Skill): SkillColumn {
	return skillColumns[skills.indexOf(skill)];
}
