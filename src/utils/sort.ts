import sortBy from 'sort-by';
import { Sort } from '../types/sort';

interface List {
	date: string;
	name: string;
	amount: number;
}

export default function sort<T extends List>(list: T[], sort: Sort): T[] {
	switch (sort) {
		case 'latest':
			return list.sort(sortBy('date')).reverse();
		case 'oldest':
			return list.sort(sortBy('date'));
		case 'a-z':
			return list.sort(sortBy('name'));
		case 'z-a':
			return list.sort(sortBy('name')).reverse();
		case 'lowest':
			return list.sort(sortBy('amount'));
		case 'highest':
			return list.sort(sortBy('amount')).reverse();
		default:
			return list.sort(sortBy('amount')).reverse();
	}
}
