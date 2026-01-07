import type { Transaction } from '../stores/transactions';
import type { Categories } from '../types/categories';

export const getLatestSpending = (
	transactions: Transaction[],
	category: Categories
): Transaction[] => {
	const spending = transactions.filter(
		(tr) => tr.category === category && tr.amount < 0
	);
	return spending.slice(0, 3);
};
