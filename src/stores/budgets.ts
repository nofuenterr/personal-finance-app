import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { Categories } from '../types/categories';
import { Colors } from '../types/colors';
import budgets from '../data/budgets.json';

export interface Budget {
	category: Categories;
	maximum: number;
	theme: Colors;
	spent: number;
}

export interface BudgetState {
	budgets: Budget[];
	addBudget: (budget: Budget) => void;
	editBudget: (budget: Budget) => void;
	deleteBudget: (category: Categories) => void;
	addSpent: (category: Categories, amount: number) => void;
}

export const useBudgetsStore = create<BudgetState>()(
	persist(
		immer((set, get) => ({
			budgets: budgets as Budget[],
			addBudget: (budget: Budget) =>
				set((state) => {
					state.budgets.push(budget);
				}),
			editBudget: (budget: Budget) =>
				set((state) => {
					const index = state.budgets.findIndex(
						(b) => budget.category === b.category
					);
					state.budgets[index] = budget;
				}),
			deleteBudget: (category: Categories) =>
				set((state) => {
					state.budgets = get().budgets.filter((b) => category !== b.category);
				}),
			addSpent: (category: Categories, amount: number) =>
				set((state) => {
					const index = state.budgets.findIndex((b) => category === b.category);
					state.budgets[index].spent = get().budgets[index].spent + amount;
				}),
		})),
		{
			name: 'budgets-storage',
		}
	)
);
