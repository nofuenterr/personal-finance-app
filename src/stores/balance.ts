import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import balance from '../data/balance.json';

export interface BalanceState {
	current: number;
	income: number;
	expenses: number;
	addCurrent: (amount: number) => void;
	subtractCurrent: (amount: number) => void;
	addIncome: (amount: number) => void;
	addExpenses: (amount: number) => void;
}

export const useBalanceStore = create<BalanceState>()(
	persist(
		immer((set, get) => ({
			current: balance.current,
			income: balance.income,
			expenses: balance.expenses,
			addCurrent: (amount) => set({ current: get().current + amount }),
			subtractCurrent: (amount) => set({ current: get().current - amount }),
			addIncome: (amount: number) =>
				set((state) => {
					state.income = get().income + amount;
					state.current = get().current + amount;
				}),
			addExpenses: (amount: number) =>
				set((state) => {
					state.expenses = get().expenses + amount;
					state.current = get().current + amount;
				}),
		})),
		{
			name: 'balance-storage',
		}
	)
);
