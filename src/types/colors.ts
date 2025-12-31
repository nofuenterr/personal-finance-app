export const Colors = {
	Green: 'green',
	Yellow: 'yellow',
	Cyan: 'cyan',
	Navy: 'navy',
	Red: 'red',
	Purple: 'purple',
	Turquoise: 'turquoise',
	Brown: 'brown',
	Magenta: 'magenta',
	Blue: 'blue',
	Gray: 'navy-gray',
	Army: 'army-green',
	Pink: 'pink',
	Gold: 'gold',
	Orange: 'orange',
} as const;

export type Colors = (typeof Colors)[keyof typeof Colors];
