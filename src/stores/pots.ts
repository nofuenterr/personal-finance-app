import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { Colors } from '../types/colors';
import pots from '../data/pots.json';

export interface Pot {
	id: string;
	name: string;
	target: number;
	total: number;
	theme: Colors;
}

export interface PotState {
	pots: Pot[];
	addPot: (pot: Omit<Pot, 'id' | 'total'>) => void;
	editPot: (id: string, updates: Partial<Omit<Pot, 'id'>>) => void;
	deletePot: (id: string) => number;
	deposit: (id: string, amount: number) => void;
	withdraw: (id: string, amount: number) => void;
}

export const usePotsStore = create<PotState>()(
	persist(
		immer((set, get) => ({
			pots: (pots as Omit<Pot, 'id'>[]).map((pots) => ({
				...pots,
				id: crypto.randomUUID(),
			})),
			addPot: (pot) =>
				set((state) => {
					state.pots.push({
						id: crypto.randomUUID(),
						total: 0,
						...pot,
					});
				}),
			editPot: (id, updates) =>
				set((state) => {
					const pot = state.pots.find((p) => p.id === id);
					if (pot) Object.assign(pot, updates);
				}),
			deletePot: (id) => {
				const pot = get().pots.find((p) => p.id === id);
				if (!pot) return 0;

				set((state) => {
					state.pots = state.pots.filter((p) => p.id !== id);
				});

				return pot.total;
			},
			deposit: (id, amount) =>
				set((state) => {
					const pot = state.pots.find((p) => p.id === id);
					if (pot) pot.total += amount;
				}),

			withdraw: (id, amount) =>
				set((state) => {
					const pot = state.pots.find((p) => p.id === id);
					if (pot) pot.total -= amount;
				}),
		})),
		{
			name: 'budget-storage',
		}
	)
);
