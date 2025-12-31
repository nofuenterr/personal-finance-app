import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { Categories } from '../types/categories';
import transactions from '../data/transactions.json';

export interface Transaction {
	avatar: string;
	name: string;
	category: Categories;
	date: string;
	amount: number;
	recurring: boolean;
}

export interface TransactionState {
	transactions: Transaction[];
}

export const useTransactionsStore = create<TransactionState>()(
	persist(
		immer((/* set, get */) => ({
			transactions: transactions as Transaction[],
		})),
		{
			name: 'transactions-storage',
		}
	)
);
