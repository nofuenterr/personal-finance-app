import type { Categories } from '../types/categories';
import type { Transaction } from '../stores/transactions';

type All = 'All Transactions';

type Filter = All | Categories;

export default function filterTransactions(
	list: Transaction[],
	category: Filter
): Transaction[] {
	if (category === 'All Transactions') return list;
	return list.filter((transaction) => transaction.category === category);
}
