import { Link } from 'react-router-dom';
import ContentWrapper from '../components/ContentWrapper';
import { useBalanceStore } from '../stores/balance';
import formatPrice from '../utils/formatPrice';
import type { ReactNode } from 'react';
import { type Pot, usePotsStore } from '../stores/pots';
import type { Colors } from '../types/colors';
import { type Transaction, useTransactionsStore } from '../stores/transactions';
import isIncome from '../utils/isIncome';
import formatDate from '../utils/formatDate';
import ScrollArea from '../components/ScrollArea';
import { useBudgetsStore, type Budget } from '../stores/budgets';
import BudgetsChart from '../components/BudgetsChart';
import {
	type BillsSummary,
	useRecurringBillsStore,
} from '../stores/recurringBills';

export default function Overview() {
	const current: number = useBalanceStore<number>((s) => s.current);
	const income: number = useBalanceStore<number>((s) => s.income);
	const expenses: number = useBalanceStore<number>((s) => s.expenses);

	const pots: Pot[] = usePotsStore<Pot[]>((s) => s.pots);
	const totalSaved: number = pots.reduce(
		(total: number, pot: Pot): number => (total += pot.total),
		0
	);

	const transactions: Transaction[] = useTransactionsStore<Transaction[]>(
		(s) => s.transactions
	);

	const budgets: Budget[] = useBudgetsStore<Budget[]>((s) => s.budgets);

	const getBillsSummary = useRecurringBillsStore((s) => s.getBillsSummary);
	const summary: BillsSummary = getBillsSummary();

	const THEME_COLORS: Record<Colors, string> = {
		green: 'var(--color-green)',
		yellow: 'var(--color-yellow)',
		cyan: 'var(--color-cyan)',
		navy: 'var(--color-navy)',
		red: 'var(--color-red)',
		purple: 'var(--color-purple)',
		turquoise: 'var(--color-turquoise)',
		brown: 'var(--color-brown)',
		magenta: 'var(--color-magenta)',
		blue: 'var(--color-blue)',
		'navy-gray': 'var(--color-navy-gray)',
		'army-green': 'var(--color-army-green)',
		pink: 'var(--color-pink)',
		gold: 'var(--color-gold)',
		orange: 'var(--color-orange)',
	};

	return (
		<ContentWrapper title="Overview" addButton={null}>
			<ScrollArea>
				<div className="grid gap-8">
					<div className="grid gap-3 md:grid-cols-3">
						<div className="grid gap-3 rounded-xl bg-gray-900 p-5 text-white">
							<h2 className="text-sm leading-normal">Current balance</h2>
							<p className="text-[2rem] leading-tight font-bold">
								${formatPrice(current)}
							</p>
						</div>
						<div className="grid gap-3 rounded-xl bg-white p-5 text-gray-900">
							<h2 className="text-sm leading-normal">Income</h2>
							<p className="text-[2rem] leading-tight font-bold">
								${formatPrice(income)}
							</p>
						</div>
						<div className="grid gap-3 rounded-xl bg-white p-5 text-gray-900">
							<h2 className="text-sm leading-normal">Expenses</h2>
							<p className="text-[2rem] leading-tight font-bold">
								${formatPrice(expenses)}
							</p>
						</div>
					</div>

					<div className="grid gap-4 md:gap-6 xl:grid-cols-[6fr_4.8fr] xl:grid-rows-[auto_auto_auto] xl:items-start xl:*:h-full xl:*:items-start">
						{' '}
						{/*  lg:contents */}
						<OverviewItem
							title="Pots"
							linkText="See Details"
							linkTo="/pots"
							xlPosition="xl:row-end-2"
						>
							<div className="grid gap-5 md:grid-cols-[4fr_6fr] xl:grid-cols-1 2xl:grid-cols-[4fr_6fr]">
								<div className="bg-beige-100 flex items-center gap-6 rounded-xl p-4">
									<svg
										width={27}
										height={35}
										viewBox="0 0 27 35"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M21.875 5.075V2.187A2.188 2.188 0 0019.687 0h-12.5A2.188 2.188 0 005 2.188v2.887a5.945 5.945 0 00-5 5.862v17.5a5.937 5.937 0 005.938 5.938h15a5.937 5.937 0 005.937-5.938v-17.5a5.945 5.945 0 00-5-5.862zM20 2.187V5h-3.125V1.875h2.813a.313.313 0 01.312.313zM11.875 5V1.875H15V5h-3.125zM7.187 1.875H10V5H6.875V2.187a.312.312 0 01.313-.312zM25 28.438a4.064 4.064 0 01-4.063 4.062h-15a4.064 4.064 0 01-4.062-4.063v-17.5a4.062 4.062 0 014.063-4.062h15A4.062 4.062 0 0125 10.938v17.5zm-6.875-6.25a3.438 3.438 0 01-3.438 3.437h-.312v1.563a.938.938 0 01-1.875 0v-1.563h-1.563a.938.938 0 010-1.875h3.75a1.563 1.563 0 000-3.125h-2.5a3.438 3.438 0 010-6.875h.313v-1.563a.938.938 0 011.875 0v1.563h1.563a.938.938 0 010 1.875h-3.75a1.563 1.563 0 000 3.125h2.5a3.438 3.438 0 013.437 3.438z"
											className="fill-green"
										/>
									</svg>
									<div className="grid gap-3">
										<p className="text-sm leading-normal text-gray-500">
											Total Saved
										</p>
										<p className="text-[2rem] leading-tight font-bold text-gray-900">
											${formatPrice(totalSaved)}
										</p>
									</div>
								</div>

								<ul className="grid grid-cols-2 gap-y-4">
									{pots
										.slice(0, 4)
										.map((pot: Pot, index: number): ReactNode => {
											return (
												<li
													key={`${pot.name}-${index}`}
													className="flex items-center gap-4"
												>
													<div
														className="h-11 w-1 rounded-lg"
														style={{ backgroundColor: THEME_COLORS[pot.theme] }}
													></div>
													<div className="grid gap-1">
														<p className="text-xs leading-normal text-gray-500">
															{pot.name}
														</p>
														<p className="text-sm leading-normal font-bold text-gray-900">
															${formatPrice(pot.total)}
														</p>
													</div>
												</li>
											);
										})}
								</ul>
							</div>
						</OverviewItem>
						<OverviewItem
							title="Transactions"
							linkText="View All"
							linkTo="/transactions"
							xlPosition="xl:row-start-2 xl:row-end-4"
						>
							<ul>
								{transactions
									.slice(0, 5)
									.map((transaction: Transaction, index: number): ReactNode => {
										return (
											<li
												key={transaction.id}
												style={{
													paddingBottom: index < 4 ? '1.25rem' : '0',
													borderBottom:
														index < 4 ? '1px solid var(--color-gray-100)' : '0',
													marginBottom: index < 4 ? '1.25rem' : '0',
												}}
											>
												<div className="flex items-center justify-between gap-2">
													<div className="flex items-center gap-4">
														<div className="size-8 overflow-hidden rounded-full">
															<img
																src={transaction.avatar}
																alt={`${transaction.name} avatar`}
															/>
														</div>
														<p className="text-sm leading-normal font-bold text-gray-900">
															{transaction.name}
														</p>
													</div>

													<div className="grid justify-items-end gap-2">
														<p
															className="text-sm leading-normal font-bold"
															style={{
																color: isIncome(transaction.amount)
																	? 'var(--color-green)'
																	: 'var(--color-gray-900)',
															}}
														>
															{isIncome(transaction.amount) ? '+' : '-'}$
															{formatPrice(Math.abs(transaction.amount))}
														</p>
														<p className="text-xs leading-normal text-gray-500">
															{formatDate(transaction.date)}
														</p>
													</div>
												</div>
											</li>
										);
									})}
							</ul>
						</OverviewItem>
						<OverviewItem
							title="Budgets"
							linkText="See Details"
							linkTo="/budgets"
							xlPosition="xl:row-start-1 row-end-3"
						>
							<div className="grid gap-4 sm:grid-cols-[1fr_auto] xl:grid-cols-1 2xl:grid-cols-[1fr_auto]">
								<div className="grid place-content-center">
									<BudgetsChart budgets={budgets} />
								</div>
								<ul className="grid grid-cols-2 gap-4 sm:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-1">
									{budgets
										.slice(0, 4)
										.map((budget: Budget, index: number): ReactNode => {
											return (
												<li key={`${budget.category}-${index}`}>
													<div className="flex items-center gap-4">
														<div
															className="h-11 w-1 rounded-lg"
															style={{
																backgroundColor: THEME_COLORS[budget.theme],
															}}
														></div>
														<div className="grid gap-1">
															<p className="text-xs leading-normal text-gray-500">
																{budget.category}
															</p>
															<p className="text-sm leading-normal font-bold text-gray-900">
																${formatPrice(budget.spent)}
															</p>
														</div>
													</div>
												</li>
											);
										})}
								</ul>
							</div>
						</OverviewItem>
						<OverviewItem
							title="Recurring Bills"
							linkText="See Details"
							linkTo="/recurringBills"
							xlPosition=""
						>
							<div className="grid gap-3">
								<div className="border-l-green items-cente bg-beige-100 flex justify-between gap-4 rounded-lg border-l-4 px-4 py-5">
									<p className="text-sm leading-normal text-gray-500">
										Paid Bills
									</p>
									<p className="text-sm leading-normal font-bold text-gray-900">
										${formatPrice(summary.paidBills.total)}
									</p>
								</div>
								<div className="border-l-yellow items-cente bg-beige-100 flex justify-between gap-4 rounded-lg border-l-4 px-4 py-5">
									<p className="text-sm leading-normal text-gray-500">
										Total Upcoming
									</p>
									<p className="text-sm leading-normal font-bold text-gray-900">
										${formatPrice(summary.totalUpcoming.total)}
									</p>
								</div>
								<div className="border-l-cyan items-cente bg-beige-100 flex justify-between gap-4 rounded-lg border-l-4 px-4 py-5">
									<p className="text-sm leading-normal text-gray-500">
										Due Soon
									</p>
									<p className="text-sm leading-normal font-bold text-gray-900">
										${formatPrice(summary.dueSoon.total)}
									</p>
								</div>
							</div>
						</OverviewItem>
					</div>
				</div>
			</ScrollArea>
		</ContentWrapper>
	);
}

interface OverviewItemProps {
	title: string;
	linkText: string;
	linkTo: string;
	xlPosition: string;
	children: ReactNode;
}

function OverviewItem({
	title,
	linkText,
	linkTo,
	xlPosition,
	children,
}: OverviewItemProps) {
	return (
		<div
			className={
				'grid gap-5 rounded-xl bg-white px-5 py-6 md:p-8 ' + xlPosition
			}
		>
			<div className="flex items-center justify-between">
				<h3 className="text-xl leading-tight font-bold text-gray-900">
					{title}
				</h3>
				<Link to={linkTo} className="group flex items-center gap-4">
					<span className="text-sm leading-normal text-gray-500 group-hover:text-gray-900">
						{linkText}
					</span>
					<span>
						<svg
							width={5}
							height={9}
							viewBox="0 0 5 9"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M.64.11l3.75 3.75a.375.375 0 010 .53L.64 8.14A.375.375 0 010 7.876v-7.5A.375.375 0 01.64.11z"
								className="fill-gray-500 group-hover:fill-gray-900"
							/>
						</svg>
					</span>
				</Link>
			</div>
			{children}
		</div>
	);
}
