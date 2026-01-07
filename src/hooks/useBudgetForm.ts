import { useForm, type FieldErrors, type Resolver } from 'react-hook-form';
import type { Colors } from '../types/colors';
import type { Categories } from '../types/categories';
import { useBudgetsStore } from '../stores/budgets';

export interface BudgetFormValues {
	category: Categories;
	maximum: number;
	theme: Colors;
}

export function useBudgetForm(
	defaults?: Partial<BudgetFormValues>,
	editingId?: string
) {
	const budgets = useBudgetsStore((s) => s.budgets);

	const resolver: Resolver<BudgetFormValues> = async (values) => {
		const errors: FieldErrors<BudgetFormValues> = {};

		if (!values.category) {
			errors.category = {
				type: 'manual',
				message: 'You must select a category',
			};
		}

		if (
			values.category &&
			budgets.some((b) => b.category === values.category && b.id !== editingId)
		) {
			errors.category = {
				type: 'manual',
				message: 'Category already exists',
			};
		}

		if (!values.maximum || values.maximum <= 0) {
			errors.maximum = {
				type: 'manual',
				message: 'Maximum must be greater than 0',
			};
		}

		if (!values.theme) {
			errors.theme = {
				type: 'manual',
				message: 'You must select a theme',
			};
		}

		return {
			values: Object.keys(errors).length ? {} : values,
			errors,
		};
	};

	return useForm<BudgetFormValues>({
		defaultValues: defaults,
		mode: 'onBlur',
		resolver,
	});
}
