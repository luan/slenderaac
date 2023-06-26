export type AccountInfo = {
	email: string;
	createdAt: Date;
	lastLogin: Date;
	premiumDays: number;
	coins: number;
	coinsTransferable: number;
	isVerified: boolean;
	is2faEnabled: boolean;
	newEmail?: string;
};
export enum AccountType {
	Normal = 1,
	Tutor,
	SeniorTutor,
	GameMaster,
	God,
}

export const isAccountType = (value: unknown): value is AccountType =>
	typeof value === 'number' &&
	(value === AccountType.Normal ||
		value === AccountType.Tutor ||
		value === AccountType.SeniorTutor ||
		value === AccountType.GameMaster ||
		value === AccountType.God);
