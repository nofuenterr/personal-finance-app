import { ColorSelect } from './ColorSelect';
import { Colors } from '../types/colors';
import type { BudgetDialogAction } from '../pages/Budgets';
import { useBudgetForm, type BudgetFormValues } from '../hooks/useBudgetForm';
import { Categories } from '../types/categories';
import { CategorySelect } from './CategorySelect';

interface Props {
	dialog: BudgetDialogAction;
	initial?: Partial<BudgetFormValues>;
	editingId?: string;
	usedColors: Colors[];
	usedCategories: Categories[];
	onSubmit: (data: BudgetFormValues) => void;
}

export function BudgetForm({
	dialog,
	initial,
	editingId,
	usedColors,
	usedCategories,
	onSubmit,
}: Props) {
	const { register, handleSubmit, setValue, watch, formState } = useBudgetForm(
		initial,
		editingId
	);

	const adjustedUsedColors =
		dialog?.type === 'edit'
			? usedColors.filter((c) => c !== dialog.object.theme)
			: usedColors;

	const adjustedUsedCategories =
		dialog?.type === 'edit'
			? usedCategories.filter((c) => c !== dialog.object.category)
			: usedCategories;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
			<div className="grid gap-1">
				<label className="grid gap-1">
					<span className="text-xs leading-normal font-bold text-gray-500">
						Theme
					</span>
					<CategorySelect
						value={watch('category')}
						options={Object.values(Categories)}
						disabledOptions={adjustedUsedCategories}
						onChange={(v) => setValue('category', v)}
						formState={formState}
					/>
				</label>
				<p className="text-red text-xs leading-normal">
					{formState.errors.category?.message}
				</p>
			</div>

			<div className="grid gap-1">
				<label
					className="text-xs leading-normal font-bold text-gray-500"
					htmlFor="maximum"
				>
					Maximum Spend
				</label>
				<input
					{...register('maximum', { valueAsNumber: true })}
					type="number"
					min={1}
					inputMode="numeric"
					className="no-spinner border-beige-500 w-full rounded-lg border px-5 py-3"
					style={{
						borderColor: formState.errors.maximum
							? 'var(--color-red)'
							: 'var(--color-beige-500)',
					}}
					id="maximum"
					placeholder="e.g. 2000"
				/>
				<p className="text-red text-xs leading-normal">
					{formState.errors.maximum?.message}
				</p>
			</div>

			<div className="grid gap-1">
				<label className="grid gap-1">
					<span className="text-xs leading-normal font-bold text-gray-500">
						Theme
					</span>
					<ColorSelect
						value={watch('theme')}
						options={Object.values(Colors)}
						disabledOptions={adjustedUsedColors}
						onChange={(v) => setValue('theme', v)}
						formState={formState}
					/>
				</label>
				<p className="text-red text-xs leading-normal">
					{formState.errors.theme?.message}
				</p>
			</div>

			<button
				type="submit"
				className="w-full cursor-pointer rounded-lg bg-gray-900 px-6 py-4 text-sm leading-normal font-bold text-white hover:bg-gray-500"
			>
				{dialog?.type === 'add'
					? 'Add Budget'
					: dialog?.type === 'edit'
						? 'Save Changes'
						: 'Save Changes'}
			</button>
		</form>
	);
}
