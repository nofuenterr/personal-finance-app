import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { Colors } from '../types/colors';
import pots from '../data/pots.json';

export interface Pot {
	name: string;
	target: number;
	total: number;
	theme: Colors;
}

export interface PotState {
	pots: Pot[];
	addPot: (pot: Pot) => void;
	editPot: (pot: Pot) => void;
	deletePot: (name: string) => void;
	deposit: (name: string, amount: number) => void;
	withdraw: (name: string, amount: number) => void;
}

export const usePotsStore = create<PotState>()(
	persist(
		immer((set, get) => ({
			pots: pots as Pot[],
			addPot: (pot: Pot) =>
				set((state) => {
					state.pots.push(pot);
				}),
			editPot: (pot: Pot) =>
				set((state) => {
					const index = state.pots.findIndex((p) => pot.name === p.name);
					state.pots[index] = pot;
				}),
			deletePot: (name: string) =>
				set((state) => {
					state.pots = get().pots.filter((p) => name !== p.name);
				}),
			deposit: (name: string, amount: number) =>
				set((state) => {
					const index = state.pots.findIndex((p) => name === p.name);
					state.pots[index].total = get().pots[index].total + amount;
				}),
			withdraw: (name: string, amount: number) =>
				set((state) => {
					const index = state.pots.findIndex((p) => name === p.name);
					state.pots[index].total = get().pots[index].total - amount;
				}),
		})),
		{
			name: 'budget-storage',
		}
	)
);
