import { ColorSelect } from './ColorSelect';
import { usePotForm, type PotFormValues } from '../hooks/usePotForm';
import { Colors } from '../types/colors';
import type { PotDialogAction } from '../pages/Pots';

interface Props {
	dialog: PotDialogAction;
	initial?: Partial<PotFormValues>;
	editingId?: string;
	usedColors: Colors[];
	onSubmit: (data: PotFormValues) => void;
}

export function PotForm({
	dialog,
	initial,
	editingId,
	usedColors,
	onSubmit,
}: Props) {
	const { register, handleSubmit, setValue, watch, formState } = usePotForm(
		initial,
		editingId
	);

	const name = watch('name');
	const adjustedUsedColors =
		dialog?.type === 'edit'
			? usedColors.filter((c) => c !== dialog.object.theme)
			: usedColors;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
			<div className="grid gap-1">
				<label
					className="text-xs leading-normal font-bold text-gray-500"
					htmlFor="potName"
				>
					Pot Name
				</label>
				<input
					{...register('name')}
					placeholder="Pot name"
					className="border-beige-500 w-full rounded-lg border px-5 py-3"
					id="potName"
					type="text"
					maxLength={30}
					style={{
						borderColor: formState.errors.name
							? 'var(--color-red)'
							: 'var(--color-beige-500)',
					}}
				/>
				<p className="flex justify-between text-xs leading-normal text-gray-500">
					<span className="text-red">{formState.errors.name?.message}</span>
					<span className="justify-self-end">
						{30 - name?.length} characters left
					</span>
				</p>
			</div>

			<div className="grid gap-1">
				<label
					className="text-xs leading-normal font-bold text-gray-500"
					htmlFor="target"
				>
					Target
				</label>
				<input
					{...register('target', { valueAsNumber: true })}
					placeholder="e.g. 2000"
					type="number"
					min={1}
					inputMode="numeric"
					className="no-spinner border-beige-500 w-full rounded-lg border px-5 py-3"
					style={{
						borderColor: formState.errors.target
							? 'var(--color-red)'
							: 'var(--color-beige-500)',
					}}
					id="target"
				/>
				<p className="text-red text-xs leading-normal">
					{formState.errors.target?.message}
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
					? 'Add Pot'
					: dialog?.type === 'edit'
						? 'Save Changes'
						: 'Save Changes'}
			</button>
		</form>
	);
}
