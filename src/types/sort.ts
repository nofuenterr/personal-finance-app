export const Sort = {
	Latest: 'latest',
	Oldest: 'oldest',
	AtoZ: 'a-z',
	ZtoA: 'z-a',
	Lowest: 'lowest',
	Highest: 'highest',
} as const;

export type Sort = (typeof Sort)[keyof typeof Sort];

type sortKeys =
	| 'Latest'
	| 'Oldest'
	| 'A to Z'
	| 'Z to A'
	| 'Lowest'
	| 'Highest';

type sortType = Record<sortKeys, Sort>;

const sortOptions: sortType = {
	Latest: 'latest',
	Oldest: 'oldest',
	'A to Z': 'a-z',
	'Z to A': 'z-a',
	Lowest: 'lowest',
	Highest: 'highest',
};

export const sortEntries = Object.entries(sortOptions);
