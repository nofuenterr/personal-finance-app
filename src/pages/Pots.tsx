import { usePotsStore, type Pot } from '../stores/pots';
import formatPrice from '../utils/formatPrice';
import getPercentage from '../utils/getPercentage';
import { Progress } from 'radix-ui';
import ScrollArea from '../components/ScrollArea';
import DropdownMenu from '../components/DropdownMenu';
import Dialog from '../components/Dialog';
import type { Colors } from '../types/colors';

export default function Pots() {
	const pots = usePotsStore((s) => s.pots);

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
		<div className="bg-beige-100 grid h-full flex-1 content-start gap-8 px-4 py-6 md:px-10 md:py-8">
			<header className="flex items-center justify-between">
				<h1 className="text-[2rem] leading-tight font-bold text-gray-900">
					Pots
				</h1>
				<Dialog
					trigger={
						<button className="cursor-pointer rounded-lg bg-gray-900 p-4 text-sm leading-normal font-bold text-white hover:bg-gray-500">
							+ Add New Pot
						</button>
					}
					title="Add New Pot"
					description="Make changes to your profile here. Click save when you're done."
					buttonText="Add Pot"
				>
					<div>
						<form action=""></form>
					</div>
				</Dialog>
			</header>
			<main className="flex-1 overflow-hidden">
				<ScrollArea>
					<ul className="grid grid-cols-1 gap-6 md:grid-cols-[repeat(auto-fill,minmax(32.375rem,1fr))]">
						{pots.map((pot: Pot) => {
							return (
								<PotCard
									key={pot.name}
									pot={pot}
									theme={THEME_COLORS[pot.theme]}
								/>
							);
						})}
					</ul>
				</ScrollArea>
			</main>
		</div>
	);
}

function PotCard({ pot, theme }: { pot: Pot; theme: string }) {
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
					<DropdownMenu
						name={pot.name}
						type="pot"
						typeCapitalized="Pot"
						editDescription="If your saving targets change, feel free to update your pots."
						editContent={<div></div>}
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
				<div className="grid gap-4 py-2.5">
					<div className="flex items-center justify-between">
						<p className="text-sm leading-normal text-gray-500">Total Saved</p>
						<p className="text-[2rem] leading-tight font-bold text-gray-900">
							${formatPrice(pot.total)}
						</p>
					</div>
					<div className="grid gap-3">
						<Progress.Root
							className="bg-beige-100 relative h-2 w-full translate-z-0 overflow-hidden rounded-sm"
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
				<div className="grid grid-cols-2 gap-4">
					<Dialog
						trigger={
							<button className="bg-beige-100 border-beige-100 hover:border-beige-500 cursor-pointer rounded-lg border p-4 text-sm leading-normal font-bold text-gray-900 hover:bg-white">
								+ Add Money
							</button>
						}
						title="Add New Pot"
						description="Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance."
						buttonText="Confirm Addition"
					>
						<div></div>
					</Dialog>
					<Dialog
						trigger={
							<button className="bg-beige-100 border-beige-100 hover:border-beige-500 cursor-pointer rounded-lg border p-4 text-sm leading-normal font-bold text-gray-900 hover:bg-white">
								+ Withdraw
							</button>
						}
						title={`Withdraw from '${pot.name}'`}
						description="Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot."
						buttonText="Continue Withdrawal"
					>
						<div></div>
					</Dialog>
				</div>
			</div>
		</li>
	);
}
