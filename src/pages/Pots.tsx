import { usePotsStore, type Pot } from '../stores/pots';
import formatPrice from '../utils/formatPrice';
import getPercentage from '../utils/getPercentage';
import { Progress } from 'radix-ui';
import ScrollArea from '../components/ui/ScrollArea';
import DropdownMenu from '../components/ui/DropdownMenu';
import Dialog from '../components/dialogs/Dialog';
import type { Colors } from '../types/colors';
import ContentWrapper from '../components/ui/ContentWrapper';
import { useState, type Dispatch } from 'react';
import { PotForm } from '../components/forms/PotForm';
import { useBalanceStore } from '../stores/balance';
import { TransactionForm } from '../components/forms/PotTransactionForm';
import AlertDialog from '../components/dialogs/AlertDialog';

export type PotDialogAction =
	| { type: 'add' }
	| { type: 'edit'; object: Pot }
	| { type: 'deposit'; object: Pot }
	| { type: 'withdraw'; object: Pot }
	| { type: 'delete'; object: Pot }
	| null;

export default function Pots() {
	const pots = usePotsStore((s) => s.pots);
	const addPot = usePotsStore((s) => s.addPot);
	const editPot = usePotsStore((s) => s.editPot);
	const deletePot = usePotsStore((s) => s.deletePot);
	const deposit = usePotsStore((s) => s.deposit);
	const subtractCurrent = useBalanceStore((s) => s.subtractCurrent);
	const withdraw = usePotsStore((s) => s.withdraw);
	const addCurrent = useBalanceStore((s) => s.addCurrent);

	const [dialog, setDialog] = useState<PotDialogAction>(null);

	const usedColors = pots.map((p) => p.theme);

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

	const handleAdd = (data: Omit<Pot, 'id' | 'total'>): void => {
		addPot(data);
		setDialog(null);
	};

	const handleEdit = (data: Partial<Omit<Pot, 'id'>>): void => {
		if (dialog?.type === 'edit') editPot(dialog.object.id, data);
		setDialog(null);
	};

	const handleDelete = () => {
		if (dialog?.type === 'delete') {
			const refunded = deletePot(dialog.object.id);
			addCurrent(refunded);
			setDialog(null);
		}
	};

	const handleDeposit = (amount: number): void => {
		if (dialog?.type === 'deposit') deposit(dialog.object.id, amount);
		setDialog(null);
		subtractCurrent(amount);
	};

	const handleWithdrawal = (amount: number): void => {
		if (dialog?.type === 'withdraw') withdraw(dialog.object.id, amount);
		setDialog(null);
		addCurrent(amount);
	};

	return (
		<ContentWrapper
			title="Pots"
			addButton={
				<button
					onClick={() => setDialog({ type: 'add' })}
					className="cursor-pointer rounded-lg bg-gray-900 p-4 text-sm leading-normal font-bold text-white hover:bg-gray-500"
				>
					<span className="[@media(max-width:22.5rem)]:hidden">
						+ Add New Pot
					</span>
					<span className="hidden [@media(max-width:22.5rem)]:inline-block">
						+ Add New
					</span>
				</button>
			}
		>
			<ScrollArea>
				<ul className="grid grid-cols-1 gap-6 md:grid-cols-[repeat(auto-fill,minmax(32.375rem,1fr))]">
					{pots.map((pot: Pot) => {
						return (
							<PotCard
								key={pot.id}
								pot={pot}
								theme={THEME_COLORS[pot.theme]}
								setDialog={setDialog}
							/>
						);
					})}
				</ul>
			</ScrollArea>

			{(() => {
				switch (dialog?.type) {
					case 'add':
						return (
							<Dialog
								open={dialog?.type === 'add'}
								onOpenChange={(open: boolean) => !open && setDialog(null)}
								title="Add New Pot"
								description="Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
							>
								<PotForm
									dialog={dialog}
									usedColors={usedColors}
									onSubmit={(data) => handleAdd(data)}
								/>
							</Dialog>
						);
					case 'edit':
						return (
							<Dialog
								open={dialog?.type === 'edit'}
								onOpenChange={(open: boolean) => !open && setDialog(null)}
								title="Edit Pot"
								description="If your saving targets change, feel free to update your pots."
							>
								<PotForm
									initial={dialog.object}
									editingId={dialog.object.id}
									usedColors={usedColors}
									onSubmit={(data) => handleEdit(data)}
									dialog={dialog}
								/>
							</Dialog>
						);
					case 'delete':
						return (
							<AlertDialog
								open={dialog?.type === 'delete'}
								onOpenChange={(open: boolean) => !open && setDialog(null)}
								name={dialog.object.name}
								type="pot"
								handleDelete={handleDelete}
							/>
						);
					case 'deposit':
						return (
							<Dialog
								open={dialog?.type === 'deposit'}
								onOpenChange={(open: boolean) => !open && setDialog(null)}
								title="Add New Pot"
								description="Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance."
							>
								<TransactionForm
									dialog={dialog}
									max={dialog.object.total}
									onSubmit={(amount) => handleDeposit(amount)}
								/>
							</Dialog>
						);
					case 'withdraw':
						return (
							<Dialog
								open={dialog?.type === 'withdraw'}
								onOpenChange={(open: boolean) => !open && setDialog(null)}
								title={`Withdraw from '${dialog.object.name}'`}
								description="Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot."
							>
								<TransactionForm
									dialog={dialog}
									max={dialog.object.total}
									onSubmit={(amount) => handleWithdrawal(amount)}
								/>
							</Dialog>
						);
					default:
						return null;
				}
			})()}
		</ContentWrapper>
	);
}

interface PotCardProps {
	pot: Pot;
	theme: string;
	setDialog: Dispatch<React.SetStateAction<PotDialogAction>>;
}

function PotCard({ pot, theme, setDialog }: PotCardProps) {
	const progress = getPercentage(pot.total, pot.target);

	return (
		<li className="rounded-xl bg-white px-5 pt-6 pb-9.5 drop-shadow-[0_8px_24px_rgba(0,0,0,0.0.5)]">
			<div className="grid gap-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div
							className={`size-4 rounded-full`}
							style={{ backgroundColor: theme }}
						></div>
						<h2 className="text-xl leading-tight font-bold text-gray-900">
							{pot.name}
						</h2>
					</div>
					<DropdownMenu<Pot>
						item="Pot"
						object={pot}
						setDialog={(action) => {
							if (action) setDialog(action);
						}}
					>
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
				<div className="grid sm:grid-cols-[3fr_10fr] sm:gap-4">
					<div className="hidden place-content-center sm:grid">
						<div className="grid justify-items-center gap-2">
							<div
								className="relative h-1 w-12 rounded-sm"
								style={{
									backgroundColor: theme,
								}}
							></div>
							<div
								className="relative h-25 w-17 rounded-lg border-4"
								style={{
									borderColor: theme,
								}}
							>
								<div
									className="absolute bottom-0 w-full"
									style={{
										height: `${progress > 100 ? 100 : progress}%`,
										backgroundColor: theme,
									}}
								></div>
							</div>
						</div>
					</div>
					<div className="grid gap-4 py-2.5">
						<div className="flex items-center justify-between">
							<p className="text-sm leading-normal text-gray-500">
								Total Saved
							</p>
							<p className="text-[2rem] leading-tight font-bold text-gray-900">
								${formatPrice(pot.total)}
							</p>
						</div>
						<div className="grid gap-3">
							<Progress.Root
								className="bg-beige-100 relative h-2 w-full translate-z-0 overflow-hidden rounded-sm"
								value={progress > 100 ? 100 : progress}
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
							<div className="flex items-center justify-between">
								<p className="text-xs leading-normal font-bold text-gray-500">
									{progress.toFixed(2) + '%'}
								</p>
								<p className="text-xs leading-normal text-gray-500">
									Target of ${formatPrice(pot.target)}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4 [@media(max-width:25rem)]:grid-cols-1">
					<button
						onClick={() => setDialog({ type: 'deposit', object: pot })}
						className="bg-beige-100 border-beige-100 hover:border-beige-500 cursor-pointer rounded-lg border p-4 text-sm leading-normal font-bold text-gray-900 hover:bg-white"
					>
						+ Add Money
					</button>
					<button
						onClick={() => setDialog({ type: 'withdraw', object: pot })}
						className="bg-beige-100 border-beige-100 hover:border-beige-500 cursor-pointer rounded-lg border p-4 text-sm leading-normal font-bold text-gray-900 hover:bg-white"
					>
						+ Withdraw
					</button>
				</div>
			</div>
		</li>
	);
}
