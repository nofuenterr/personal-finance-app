import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { isWithinInterval, getDay, subDays } from 'date-fns';
import recurringBills from '../data/recurringBills.json';

type Interval = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

export interface RecurringBill {
	avatar: string;
	name: string;
	interval: Interval;
	date: string;
	amount: number;
	paid: boolean;
}

export interface Summary {
	count: number;
	total: number;
}

export interface BillsSummary {
	totalBills: number;
	paidBills: Summary;
	totalUpcoming: Summary;
	dueSoon: Summary;
}

export interface RecurringBillState {
	recurringBills: RecurringBill[];
	getBillsSummary: () => BillsSummary;
}

const isDueSoon = (rbDate: string): boolean => {
	const currentDate = new Date(Date.now());
	const currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();
	const dueDay = getDay(new Date(rbDate));
	const dueDate = new Date(currentYear, currentMonth, dueDay);
	const aWeekFromDueDate = subDays(dueDate, 7);

	return isWithinInterval(currentDate, {
		start: aWeekFromDueDate,
		end: dueDate,
	});
};

export const useRecurringBillsStore = create<RecurringBillState>()(
	persist(
		immer((_set, get) => ({
			recurringBills: recurringBills as RecurringBill[],
			getBillsSummary: (): BillsSummary => {
				const paidBills = {
					count: 0,
					total: 0,
				};
				const totalUpcoming = {
					count: 0,
					total: 0,
				};
				const dueSoon = {
					count: 0,
					total: 0,
				};
				const totalBills: number = get().recurringBills.reduce(
					(total: number, rb: RecurringBill): number => {
						if (rb.paid) {
							++paidBills.count;
							paidBills.total += rb.amount;
						} else {
							++totalUpcoming.count;
							totalUpcoming.total += rb.amount;
						}
						if (!rb.paid && isDueSoon(rb.date)) {
							++dueSoon.count;
							dueSoon.total += rb.amount;
						}

						return (total += rb.amount);
					},
					0
				);
				return {
					totalBills,
					paidBills,
					totalUpcoming,
					dueSoon,
				};
			},
		})),
		{
			name: 'recurring-bills-storage',
		}
	)
);
