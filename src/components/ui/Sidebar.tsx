import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import logoLarge from '../assets/icons/logo-large.svg';
import logoSmall from '../assets/icons/logo-small.svg';
import SidebarIcons, { SidebarIconsType } from './SidebarIcons';
import Tooltip from './Tooltip';

export default function Sibebar() {
	const [open, setOpen] = useState<boolean>(true);

	return (
		<aside
			className={
				'flex flex-col gap-6 overflow-hidden rounded-tl-lg rounded-tr-lg bg-gray-900 lg:h-full lg:rounded-tl-none lg:rounded-br-lg ' +
				(open ? 'lg:w-75' : 'lg:w-auto')
			}
		>
			<div className="hidden px-8 py-10 lg:block">
				<NavLink to={'/'}>
					{open ? (
						<img src={logoLarge} alt="Brand logo large" />
					) : (
						<img src={logoSmall} alt="Brand logo small" />
					)}
				</NavLink>
			</div>
			<nav className="">
				<ul className="flex items-center justify-center px-4 pt-2 md:gap-10.5 md:px-10 lg:flex-col lg:items-start lg:gap-1 lg:pt-0 lg:pr-6 lg:pl-0">
					<NavListItem to="" icon="overview" text="Overview" open={open} />
					<NavListItem
						to="transactions"
						icon="transactions"
						text="Transactions"
						open={open}
					/>
					<NavListItem to="budgets" icon="budgets" text="Budgets" open={open} />
					<NavListItem to="pots" icon="pots" text="Pots" open={open} />
					<NavListItem
						to="recurringBills"
						icon="recurringBills"
						text="Recurring bills"
						open={open}
					/>
				</ul>
			</nav>
			<div className="mt-auto mb-32 hidden px-8 py-4 lg:block">
				<button
					onClick={() => setOpen((s) => !s)}
					className="group flex w-full cursor-pointer items-center gap-4 leading-normal font-bold text-gray-300 transition-colors duration-250 hover:text-gray-100"
				>
					<Tooltip content="Minimize Menu">
						<div
							className={
								'grid size-6 place-content-center ' + (open ? '' : 'rotate-180')
							}
						>
							<SidebarIcons
								icon="minimizeMenu"
								className="fill-gray-300 group-hover:fill-gray-100"
							/>
						</div>
					</Tooltip>
					<p className={open ? '' : 'lg:hidden'}>Minimize Menu</p>
				</button>
			</div>
		</aside>
	);
}

interface NavListItemProps {
	to: string;
	icon: SidebarIconsType;
	text: string;
	open: boolean;
}

function NavListItem({ to = '', icon, text, open }: NavListItemProps) {
	return (
		<li className="has-[.active]:bg-beige-100 grid w-full flex-1 place-content-center justify-stretch rounded-tl-lg rounded-tr-lg text-xs leading-normal font-bold text-gray-300 transition-colors duration-250 hover:text-gray-100 has-[.active]:text-gray-900 lg:rounded-tl-none lg:rounded-br-lg lg:text-base">
			<NavLink
				to={`/${to}`}
				className={({ isActive }) =>
					[
						'group flex flex-col items-center gap-1 px-2 pt-2 pb-3 lg:flex-row lg:gap-4 lg:px-8 lg:py-4',
						isActive ? 'active' : '',
					].join(' ')
				}
			>
				<Tooltip content={text}>
					<div className="grid size-6 place-content-center">
						<SidebarIcons
							icon={icon}
							className="group-[.active]:fill-green fill-gray-300 group-hover:fill-gray-100"
						/>
					</div>
				</Tooltip>
				<p className={'hidden md:block ' + (open ? '' : 'lg:hidden')}>{text}</p>
			</NavLink>
		</li>
	);
}
