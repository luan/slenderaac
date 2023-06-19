export const CoinOrderStatus = {
	PENDING: 'PENDING',
	FAILED_ATTEMPT: 'FAILED_ATTEMPT',
	COMPLETED: 'COMPLETED',
	CANCELED: 'CANCELED',
};

export type CoinOrderStatus =
	(typeof CoinOrderStatus)[keyof typeof CoinOrderStatus];
