import * as Select from '@radix-ui/react-select';
import { forwardRef } from 'react';
import type { Colors } from '../types/colors';
import ScrollAreaComponent from './ui/ScrollArea';
import type { FormState } from 'react-hook-form';
import type { PotFormValues } from '../hooks/usePotForm';

interface Props {
	value?: Colors;
	onChange: (v: Colors) => void;
	options: Colors[];
	disabledOptions?: Colors[];
	formState: FormState<PotFormValues>;
}

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

export const ColorSelect = forwardRef<HTMLButtonElement, Props>(
	({ value, onChange, options, disabledOptions = [], formState }, ref) => (
		<Select.Root value={value} onValueChange={onChange}>
			<Select.Trigger
				ref={ref}
				className="border-beige-500 flex w-full items-center justify-between rounded-lg border px-5 py-3"
				style={{
					borderColor: formState.errors.theme
						? 'var(--color-red)'
						: 'var(--color-beige-500)',
				}}
			>
				<Select.Value placeholder="Select theme" />
				<Select.Icon className="SelectIcon">
					<svg
						width={11}
						height={6}
						viewBox="0 0 11 6"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.854.854l-5 5a.5.5 0 01-.707 0l-5-5A.5.5 0 01.5 0h10a.5.5 0 01.354.854z"
							className="fill-gray-900"
						/>
					</svg>
				</Select.Icon>
			</Select.Trigger>

			<Select.Portal>
				<Select.Content className="rounded-lg bg-white px-5 py-3 shadow-lg">
					<Select.Viewport>
						<ScrollAreaComponent>
							{options.map((c, i) => (
								<Select.Item
									key={c}
									value={c}
									disabled={disabledOptions.includes(c)}
									className="cursor-pointer data-disabled:opacity-40"
									style={{
										paddingBottom: i < options.length - 1 ? '0.75rem' : '0',
										borderBottom:
											i < options.length - 1
												? '1px solid var(--color-gray-100)'
												: '0',
										marginBottom: i < options.length - 1 ? '0.75rem' : '0',
									}}
								>
									<Select.ItemText>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<div
													className="size-4 rounded-full"
													style={{ backgroundColor: THEME_COLORS[c] }}
												></div>
												<span className="text-sm leading-normal text-gray-900">
													{c}
												</span>
											</div>
											<span className="text-xs leading-normal text-gray-900">
												{disabledOptions.includes(c) && ' already used'}
											</span>
										</div>
									</Select.ItemText>
								</Select.Item>
							))}
						</ScrollAreaComponent>
					</Select.Viewport>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	)
);
