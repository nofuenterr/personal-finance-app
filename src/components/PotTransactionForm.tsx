import type { PotDialogAction } from '../pages/Pots';
import { usePotTransactionForm } from '../hooks/usePotTransactionForm';
import formatPrice from '../utils/formatPrice';
import getPercentage from '../utils/getPercentage';

interface TransactionFormProps {
	dialog: PotDialogAction;
	max: number;
	onSubmit: (amount: number) => void;
}

export function TransactionForm({
	dialog,
	max,
	onSubmit,
}: TransactionFormProps) {
	const { register, handleSubmit, watch, setValue, formState } =
		usePotTransactionForm(dialog, max);

	const amount = watch('amount');

	let newAmount: number = 0;
	if (dialog?.type === 'deposit')
		newAmount = max + (isNaN(amount) ? 0 : amount);
	if (dialog?.type === 'withdraw')
		newAmount = max - (isNaN(amount) ? 0 : amount);

	let newProgress: number = 0;
	let originalProgress: number = 0;
	let addedProgress: number = 0;
	let subtractedProgress: number = 0;
	let target: string = '$0.00';

	if (dialog?.type === 'deposit' || dialog?.type === 'withdraw') {
		originalProgress = getPercentage(dialog.object.total, dialog.object.target);
		newProgress = getPercentage(newAmount, dialog.object.target);

		if (dialog.type === 'deposit') {
			addedProgress = newProgress - originalProgress;
		}

		if (dialog.type === 'withdraw') {
			const extraProgress = originalProgress > 100 ? originalProgress - 100 : 0;
			subtractedProgress =
				getPercentage(amount, dialog.object.target) - extraProgress;
		}

		target = `$${formatPrice(dialog.object.target)}`;
	}

	if (amount > max && dialog?.type === 'withdraw') setValue('amount', max);

	return (
		<form
			onSubmit={handleSubmit((data) => onSubmit(data.amount))}
			className="grid gap-4"
		>
			<div className="grid gap-4">
				<div className="flex items-center justify-between">
					<p className="text-sm leading-normal text-gray-500">New Amount</p>
					<p className="text-[2rem] leading-tight font-bold text-gray-900">
						${formatPrice(newAmount)}
					</p>
				</div>

				<div className="grid gap-3">
					<div className="bg-beige-100 relative h-2 w-full rounded-sm">
						<div className="absolute left-0 flex h-full w-full overflow-hidden rounded-sm">
							<div
								className="mr-0.5 h-full rounded-sm bg-gray-900"
								style={{
									width: subtractedProgress
										? `${newProgress}%`
										: `${originalProgress}%`,
									borderTopRightRadius:
										(addedProgress > 0 && originalProgress < 100) ||
										subtractedProgress > 0
											? '0'
											: '4px',
									borderBottomRightRadius:
										(addedProgress > 0 && originalProgress < 100) ||
										subtractedProgress > 0
											? '0'
											: '4px',
									display: newAmount === 0 ? 'none' : 'inline-block',
								}}
							></div>
							<div
								className="bg-red h-full rounded-tr-sm rounded-br-sm"
								style={{
									width: `${subtractedProgress ? subtractedProgress : 0}%`,
									borderTopLeftRadius: newProgress === 0 ? '4px' : '0',
									borderBottomLeftRadius: newProgress === 0 ? '4px' : '0',
								}}
							></div>
							<div
								className="bg-green h-full rounded-sm"
								style={{
									width:
										newProgress > 100
											? `${100 - originalProgress}%`
											: `${addedProgress}%`,
									borderTopLeftRadius: originalProgress === 0 ? '4px' : '0',
									borderBottomLeftRadius: originalProgress === 0 ? '4px' : '0',
								}}
							></div>
						</div>
					</div>
					<div className="flex items-center justify-between">
						<p
							className="text-xs leading-normal font-bold"
							style={{
								color:
									dialog?.type === 'withdraw'
										? 'var(--color-red)'
										: dialog?.type === 'deposit'
											? 'var(--color-green)'
											: 'var(--color-gray-900)',
							}}
						>
							{newProgress.toFixed(2)}%
						</p>
						<p className="text-xs leading-normal text-gray-500">
							Target of {target}
						</p>
					</div>
				</div>
			</div>

			<div className="grid gap-1">
				<label
					className="text-xs leading-normal font-bold text-gray-500"
					htmlFor="amount"
				>
					{dialog?.type === 'withdraw'
						? 'Amount to Withdraw'
						: dialog?.type === 'deposit'
							? 'Amount to Add'
							: 'Amount'}
				</label>
				<input
					{...register('amount', { valueAsNumber: true, min: 1 })}
					type="number"
					id="amount"
					min={1}
					inputMode="numeric"
					className="no-spinner border-beige-500 w-full rounded-lg border px-5 py-3"
					style={{
						borderColor: formState.errors.amount
							? 'var(--color-red)'
							: 'var(--color-beige-500)',
					}}
				/>
				<p className="text-red text-xs leading-normal">
					{formState.errors.amount?.message}
				</p>
			</div>
			<button
				type="submit"
				className="w-full cursor-pointer rounded-lg bg-gray-900 px-6 py-4 text-sm leading-normal font-bold text-white hover:bg-gray-500"
			>
				{dialog?.type === 'withdraw'
					? 'Confirm Withdrawal'
					: dialog?.type === 'deposit'
						? 'Confirm Addition'
						: 'Save Changes'}
			</button>
		</form>
	);
}
