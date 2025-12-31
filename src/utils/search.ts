import { matchSorter } from 'match-sorter';

interface List {
	name: string;
}

export default function search<T extends List>(list: T[], query: string): T[] {
	return matchSorter(list, query, { keys: ['name'] });
}
