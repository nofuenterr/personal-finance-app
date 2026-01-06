import { useForm, type FieldErrors, type Resolver } from 'react-hook-form';
import type { PotDialogAction } from '../pages/Pots';
import { useBalanceStore } from '../stores/balance';

export interface PotTransactionFormValues {
	amount: number;
}

export function usePotTransactionForm(dialog: PotDialogAction, max: number) {
	const current = useBalanceStore((s) => s.current);

	const resolver: Resolver<PotTransactionFormValues> = async (values) => {
		const errors: FieldErrors<PotTransactionFormValues> = {};

		if (!values.amount || values.amount <= 0) {
			errors.amount = {
				type: 'manual',
				message: 'Amount must be greater than 0',
			};
		}

		if (dialog?.type === 'withdraw' && values.amount > max) {
			errors.amount = {
				type: 'manual',
				message: 'Withdraw amount must not be greater than total saved',
			};
		}

		if (dialog?.type === 'deposit' && values.amount > current) {
			errors.amount = {
				type: 'manual',
				message: 'Deposit amount must not be greater than current balance',
			};
		}

		return {
			values: Object.keys(errors).length ? {} : values,
			errors,
		};
	};

	return useForm<PotTransactionFormValues>({
		defaultValues: { amount: 0 },
		resolver,
	});
}
