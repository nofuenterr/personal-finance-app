export const Sort = {
	Latest: 'latest',
	Oldest: 'oldest',
	AtoZ: 'a-z',
	ZtoA: 'z-a',
	Lowest: 'lowest',
	Highest: 'highest',
} as const;

export type Sort = (typeof Sort)[keyof typeof Sort];
