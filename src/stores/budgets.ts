import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { Categories } from '../types/categories';
import { Colors } from '../types/colors';
import budgets from '../data/budgets.json';
import { useTransactionsStore } from './transactions';

export interface Budget {
	id: string;
	category: Categories;
	maximum: number;
	theme: Colors;
	spent: number;
}

export interface BudgetState {
	budgets: Budget[];
	addBudget: (budget: Omit<Budget, 'id' | 'spent'>) => void;
	editBudget: (id: string, updates: Partial<Omit<Budget, 'id'>>) => void;
	deleteBudget: (id: string) => void;
	addSpent: (id: string, amount: number) => void;
	getTotalSpent: () => number;
	getTotalLimit: () => number;
}

export const useBudgetsStore = create<BudgetState>()(
	persist(
		immer((set, get) => ({
			budgets: (budgets as Omit<Budget, 'id'>[]).map((budget) => {
				const spent = useTransactionsStore
					.getState()
					.transactions.reduce((total, tr) => {
						if (tr.category === budget.category && tr.amount < 0)
							return (total += Math.abs(tr.amount));
						return total;
					}, 0);
				return {
					...budget,
					id: crypto.randomUUID(),
					spent,
				};
			}),
			addBudget: (budget: Omit<Budget, 'id' | 'spent'>) =>
				set((state) => {
					const spent = useTransactionsStore
						.getState()
						.transactions.reduce((total, tr) => {
							if (tr.category === budget.category && tr.amount < 0)
								return (total += Math.abs(tr.amount));
							return total;
						}, 0);

					state.budgets.push({
						id: crypto.randomUUID(),
						spent,
						...budget,
					});
				}),
			editBudget: (id: string, updates: Partial<Omit<Budget, 'id'>>) =>
				set((state) => {
					const budget = state.budgets.find((b) => b.id === id);
					if (budget) Object.assign(budget, updates);
				}),
			deleteBudget: (id: string) => {
				set((state) => {
					state.budgets = get().budgets.filter((b) => b.id !== id);
				});
			},
			addSpent: (id: string, amount: number) =>
				set((state) => {
					const index = state.budgets.findIndex((b) => id === b.id);
					state.budgets[index].spent = get().budgets[index].spent + amount;
				}),
			getTotalSpent: (): number => {
				return get().budgets.reduce(
					(total, budget) => (total += budget.spent),
					0
				);
			},
			getTotalLimit: (): number => {
				return get().budgets.reduce(
					(total, budget) => (total += budget.maximum),
					0
				);
			},
		})),
		{
			name: 'budgets-storage',
		}
	)
);
