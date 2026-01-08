import ContentWrapper from '../components/ui/ContentWrapper';
import Dialog from '../components/dialogs/Dialog';
import DropdownMenu from '../components/ui/DropdownMenu';
import { useBudgetsStore, type Budget } from '../stores/budgets';
import type { Colors } from '../types/colors';
import formatPrice from '../utils/formatPrice';
import { Progress } from 'radix-ui';
import getPercentage from '../utils/getPercentage';
import ScrollArea from '../components/ui/ScrollArea';
import BudgetsChart from '../components/ui/BudgetsChart';
import { useState, type Dispatch } from 'react';
import { BudgetForm } from '../components/forms/BudgetForm';
import AlertDialog from '../components/dialogs/AlertDialog';
import { Link } from 'react-router-dom';
import { getLatestSpending } from '../utils/getLatestSpending';
import { useTransactionsStore, type Transaction } from '../stores/transactions';
import formatDate from '../utils/formatDate';

export type BudgetDialogAction =
	| { type: 'add' }
	| { type: 'edit'; object: Budget }
	| { type: 'delete'; object: Budget }
	| null;

export default function Budgets() {
	const budgets = useBudgetsStore((s) => s.budgets);
	const addBudget = useBudgetsStore((s) => s.addBudget);
	const editBudget = useBudgetsStore((s) => s.editBudget);
	const deleteBudget = useBudgetsStore((s) => s.deleteBudget);
	const transactions = useTransactionsStore((s) => s.transactions);

	const [dialog, setDialog] = useState<BudgetDialogAction>(null);

	const usedCategories = budgets.map((b) => b.category);
	const usedColors = budgets.map((b) => b.theme);

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

	const getRemainingBudget = (maximum: number, spent: number): string => {
		const remaining = maximum - spent;
		const adjustedRemaining = remaining >= 0 ? remaining : 0;

		return `$${formatPrice(adjustedRemaining)}`;
	};

	const handleAdd = (data: Omit<Budget, 'id' | 'spent'>): void => {
		addBudget(data);
		setDialog(null);
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
	};

	const handleEdit = (data: Partial<Omit<Budget, 'id'>>): void => {
		if (dialog?.type === 'edit') editBudget(dialog.object.id, data);
		setDialog(null);
		document.dispatchEvent(new KeyboardEvent('keydonm wn', { key: 'Escape' }));
	};

	const handleDelete = () => {
		if (dialog?.type === 'delete') deleteBudget(dialog.object.id);
		setDialog(null);
	};

	return (
		<ContentWrapper
			title="Budgets"
			addButton={
				<button
					onClick={() => setDialog({ type: 'add' })}
					className="cursor-pointer rounded-lg bg-gray-900 p-4 text-sm leading-normal font-bold text-white hover:bg-gray-500"
				>
					<span className="[@media(max-width:22.5rem)]:hidden">
						+ Add New Budget
					</span>
					<span className="hidden [@media(max-width:22.5rem)]:inline-block">
						+ Add New
					</span>
				</button>
			}
		>
			<ScrollArea>
				<div className="grid items-start gap-6 lg:grid-cols-2">
					<div className="grid gap-8 rounded-xl bg-white px-5 py-6 md:grid-cols-2 lg:grid-cols-1">
						<div className="grid place-content-center">
							<BudgetsChart budgets={budgets} />
						</div>
						<div className="grid gap-6">
							<h2 className="text-xl leading-tight font-bold text-gray-900">
								Spending Summary
							</h2>
							<ul className="grid gap-4">
								{budgets.map((budget) => {
									return (
										<li key={budget.category}>
											<div className="grid w-full grid-cols-[auto_auto_1fr] items-center gap-4">
												<div
													className="h-5 w-1 rounded-lg"
													style={{
														backgroundColor: THEME_COLORS[budget.theme],
													}}
												></div>
												<p className="mr-auto text-sm leading-tight text-gray-500">
													{budget.category}
												</p>
												<p className="flex items-center gap-2 justify-self-end [@media(max-width:22.5rem)]:grid [@media(max-width:22.5rem)]:justify-items-end">
													<span className="leading-normal font-bold text-gray-900">
														${formatPrice(budget.spent)}
													</span>
													<span className="text-xs leading-normal text-gray-500">
														of ${formatPrice(budget.maximum)}
													</span>
												</p>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
					</div>

					<div>
						<ul className="grid gap-6">
							{budgets.map((budget) => {
								return (
									<BudgetCard
										key={budget.category}
										budget={budget}
										theme={THEME_COLORS[budget.theme]}
										getRemainingBudget={getRemainingBudget}
										setDialog={setDialog}
										latestSpending={getLatestSpending(
											transactions,
											budget.category
										)}
									/>
								);
							})}
						</ul>
					</div>
				</div>
			</ScrollArea>

			{dialog?.type === 'add' && (
				<Dialog
					open={dialog?.type === 'add'}
					onOpenChange={(open: boolean) => !open && setDialog(null)}
					title="Add New Budget"
					description="Choose a category to set a spending budget. These categories can help you monitor spending."
				>
					<BudgetForm
						dialog={dialog}
						usedCategories={usedCategories}
						usedColors={usedColors}
						onSubmit={(data) => handleAdd(data)}
					/>
				</Dialog>
			)}

			{dialog?.type === 'edit' && (
				<Dialog
					open={dialog?.type === 'edit'}
					onOpenChange={(open: boolean) => !open && setDialog(null)}
					title="Edit Budget"
					description="As your budgets change, feel free to update your spending limits."
				>
					<BudgetForm
						initial={dialog.object}
						editingId={dialog.object.id}
						usedCategories={usedCategories}
						usedColors={usedColors}
						onSubmit={(data) => handleEdit(data)}
						dialog={dialog}
					/>
				</Dialog>
			)}

			{dialog?.type === 'delete' && (
				<AlertDialog
					open={dialog?.type === 'delete'}
					onOpenChange={(open: boolean) => !open && setDialog(null)}
					name={dialog.object.category}
					type="budget"
					handleDelete={handleDelete}
				/>
			)}
		</ContentWrapper>
	);
}

interface BudgetCardProps {
	budget: Budget;
	theme: string;
	getRemainingBudget: (maximum: number, spent: number) => string;
	setDialog: Dispatch<React.SetStateAction<BudgetDialogAction>>;
	latestSpending: Transaction[];
}

function BudgetCard({
	budget,
	theme,
	getRemainingBudget,
	setDialog,
	latestSpending,
}: BudgetCardProps) {
	const initial = getPercentage(budget.spent, budget.maximum);
	const progress = initial > 100 ? 100 : initial;

	return (
		<li>
			<div className="grid gap-5 rounded-xl bg-white px-5 py-6 md:p-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div
							className={`size-4 rounded-full`}
							style={{ backgroundColor: theme }}
						></div>
						<h2 className="text-xl leading-tight font-bold text-gray-900">
							{budget.category}
						</h2>
					</div>
					<DropdownMenu item="Budget" setDialog={setDialog} object={budget}>
						<button className="cursor-pointer">
							<svg
								width="15"
								height="15"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
									className="fill-gray-300"
									fillRule="evenodd"
									clipRule="evenodd"
								></path>
							</svg>
						</button>
					</DropdownMenu>
				</div>

				<div className="grid gap-4">
					<p className="text-sm leading-normal text-gray-500">
						Maximum of ${formatPrice(budget.maximum)}
					</p>
					<div className="bg-beige-100 rounded-sm p-1">
						<Progress.Root
							className="bg-beige-100 relative h-6 w-full translate-z-0 overflow-hidden rounded-sm"
							value={progress}
						>
							<Progress.Indicator
								className={
									'h-full w-full rounded-sm transition-transform duration-660 ease-out'
								}
								style={{
									transform: `translateX(-${100 - progress}%)`,
									backgroundColor: theme,
								}}
							/>
						</Progress.Root>
					</div>
					<div className="flex items-center gap-4">
						<div className="flex flex-1 items-center gap-4">
							<div
								className="h-11 w-1 rounded-lg"
								style={{ backgroundColor: theme }}
							></div>
							<div className="grid gap-1">
								<p className="text-xs leading-normal text-gray-500">Spent</p>
								<p className="text-sm leading-normal font-bold text-gray-900">
									${formatPrice(budget.spent)}
								</p>
							</div>
						</div>
						<div className="flex flex-1 items-center gap-4">
							<div className="bg-beige-100 h-11 w-1 rounded-lg"></div>
							<div className="grid gap-1">
								<p className="text-xs leading-normal text-gray-500">Free</p>
								<p className="text-sm leading-normal font-bold text-gray-900">
									{getRemainingBudget(budget.maximum, budget.spent)}
								</p>
							</div>
						</div>
					</div>
				</div>

				{latestSpending.length > 0 ? (
					<div className="bg-beige-100 grid gap-5 rounded-xl p-4 md:p-5">
						<div className="flex items-center justify-between">
							<p className="leading-normal font-bold text-gray-900">
								Latest Spending
							</p>
							<Link
								to="/transactions"
								className="group flex items-center gap-4"
							>
								<span className="text-sm leading-normal text-gray-500 group-hover:text-gray-900">
									See All
								</span>
								<svg
									width={5}
									height={9}
									viewBox="0 0 5 9"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M.64.11l3.75 3.75a.375.375 0 010 .53L.64 8.14A.375.375 0 010 7.875v-7.5A.375.375 0 01.64.109z"
										className="fill-gray-500 group-hover:fill-gray-900"
									/>
								</svg>
							</Link>
						</div>

						<ul>
							{latestSpending.map((ls, i) => {
								return (
									<li
										key={ls.id}
										className="flex items-center justify-between gap-1"
										style={{
											paddingBottom:
												i < latestSpending.length - 1 ? '0.75rem' : '0',
											borderBottom:
												i < latestSpending.length - 1
													? '1px solid var(--color-gray-500)'
													: 'none',
											marginBottom:
												i < latestSpending.length - 1 ? '0.75rem' : '0',
										}}
									>
										<div className="flex items-center gap-4">
											<div className="hidden size-8 overflow-hidden rounded-full md:inline-flex">
												<img src={ls.avatar} alt={`${ls.name} avatar`} />
											</div>
											<p className="text-xs leading-normal font-bold text-gray-900">
												{ls.name}
											</p>
										</div>
										<div className="grid justify-items-end gap-1 text-end">
											<p className="text-xs leading-normal font-bold text-gray-900">
												-${formatPrice(Math.abs(ls.amount))}
											</p>
											<p className="text-xs leading-normal text-gray-500">
												{formatDate(ls.date)}
											</p>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				) : null}
			</div>
		</li>
	);
}
