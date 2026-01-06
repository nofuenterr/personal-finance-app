import { useForm, type FieldErrors, type Resolver } from 'react-hook-form';
import { usePotsStore } from '../stores/pots';
import type { Colors } from '../types/colors';

export interface PotFormValues {
	name: string;
	target: number;
	theme: Colors;
}

export function usePotForm(
	defaults?: Partial<PotFormValues>,
	editingId?: string
) {
	const pots = usePotsStore((s) => s.pots);

	const resolver: Resolver<PotFormValues> = async (values) => {
		const errors: FieldErrors<PotFormValues> = {};

		if (!values.name) {
			errors.name = {
				type: 'manual',
				message: 'Name is required',
			};
		}

		if (values.name.length > 30) {
			errors.name = {
				type: 'manual',
				message: 'Name should be 30 characters or less',
			};
		}

		if (
			values.name &&
			pots.some((p) => p.name === values.name && p.id !== editingId)
		) {
			errors.name = {
				type: 'manual',
				message: 'Name already exists',
			};
		}

		if (!values.target || values.target <= 0) {
			errors.target = {
				type: 'manual',
				message: 'Target must be greater than 0',
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

	return useForm<PotFormValues>({
		defaultValues: defaults,
		mode: 'onBlur',
		resolver,
	});
}
