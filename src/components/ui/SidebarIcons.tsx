export const SidebarIconsType = {
	Overview: 'overview',
	Transactions: 'transactions',
	Budgets: 'budgets',
	Pots: 'pots',
	RecurringBills: 'recurringBills',
	MinimizeMenu: 'minimizeMenu',
} as const;

export type SidebarIconsType =
	(typeof SidebarIconsType)[keyof typeof SidebarIconsType];

interface SidebarIconsProps {
	icon: SidebarIconsType;
	className: string;
}

export default function SidebarIcons({ icon, ...props }: SidebarIconsProps) {
	if (icon === 'overview') {
		return (
			<svg
				width={18}
				height={19}
				viewBox="0 0 18 19"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M18 8.581v8.667a1.5 1.5 0 01-1.5 1.5h-3.75a1.5 1.5 0 01-1.5-1.5v-3.75a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v3.75a1.5 1.5 0 01-1.5 1.5H1.5a1.5 1.5 0 01-1.5-1.5V8.581a1.5 1.5 0 01.485-1.104L7.985.4l.01-.01a1.5 1.5 0 012.029.01l7.5 7.076A1.5 1.5 0 0118 8.58z"
					{...props}
				/>
			</svg>
		);
	}

	if (icon === 'transactions') {
		return (
			<svg
				width={17}
				height={17}
				viewBox="0 0 17 17"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M7.443 12.464a.75.75 0 01-.162.817l-3 3a.75.75 0 01-1.061 0l-3-3a.75.75 0 01.53-1.28H3V.75a.75.75 0 011.5 0V12h2.25a.75.75 0 01.693.463zm8.838-9.244l-3-3a.75.75 0 00-1.061 0l-3 3a.75.75 0 00.53 1.28H12v11.25a.75.75 0 101.5 0V4.5h2.25a.75.75 0 00.531-1.28z"
					{...props}
				/>
			</svg>
		);
	}

	if (icon === 'budgets') {
		return (
			<svg
				width={20}
				height={20}
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M.005 8.582a9.592 9.592 0 012.186-5.04 1.5 1.5 0 012.215-.103L7 6.089a1.488 1.488 0 01.158 1.92 2.4 2.4 0 00-.347.726.375.375 0 01-.358.265H.378a.375.375 0 01-.373-.418zM10.565.006A1.5 1.5 0 008.935 1.5v3.813a1.487 1.487 0 001.242 1.477 3 3 0 01.507 5.79.38.38 0 00-.25.357v6.116a.376.376 0 00.419.375 9.782 9.782 0 008.582-9.54c.07-5.089-3.826-9.43-8.87-9.882zM8.677 12.578a3 3 0 01-1.819-1.821.38.38 0 00-.356-.257H.377a.376.376 0 00-.375.417 9.759 9.759 0 008.515 8.515.374.374 0 00.417-.375v-6.12a.38.38 0 00-.257-.36z"
					{...props}
				/>
			</svg>
		);
	}

	if (icon === 'pots') {
		return (
			<svg
				width={17}
				height={21}
				viewBox="0 0 17 21"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M13.5 3.076V1.5A1.5 1.5 0 0012 0H4.5A1.5 1.5 0 003 1.5v1.576A3.755 3.755 0 000 6.75v10.5A3.75 3.75 0 003.75 21h9a3.75 3.75 0 003.75-3.75V6.75a3.755 3.755 0 00-3-3.674zM7.5 1.5H9V3H7.5V1.5zm-3 0H6V3H4.5V1.5zM9 15.75v.75a.75.75 0 11-1.5 0v-.75h-.75a.75.75 0 110-1.5H9a.75.75 0 100-1.5H7.5a2.25 2.25 0 010-4.5V7.5a.75.75 0 011.5 0v.75h.75a.75.75 0 110 1.5H7.5a.75.75 0 000 1.5H9a2.25 2.25 0 010 4.5zM12 3h-1.5V1.5H12V3z"
					{...props}
				/>
			</svg>
		);
	}

	if (icon === 'recurringBills') {
		return (
			<svg
				width={20}
				height={17}
				viewBox="0 0 20 17"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M18 0H1.5A1.5 1.5 0 000 1.5v14.25a.75.75 0 001.086.67l2.664-1.332 2.664 1.332a.75.75 0 00.672 0l2.664-1.332 2.664 1.332a.75.75 0 00.672 0l2.664-1.332 2.664 1.332a.75.75 0 001.086-.67V1.5A1.5 1.5 0 0018 0zm-3.75 9.75h-9a.75.75 0 010-1.5h9a.75.75 0 110 1.5zm0-3h-9a.75.75 0 010-1.5h9a.75.75 0 110 1.5z"
					{...props}
				/>
			</svg>
		);
	}

	if (icon === 'minimizeMenu') {
		return (
			<svg
				width={20}
				height={20}
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M13.5 5.25v9a.75.75 0 01-.75.75H10.5v3.75a.75.75 0 01-1.28.531l-9-9a.75.75 0 010-1.061l9-9a.75.75 0 011.28.53V4.5h2.25a.75.75 0 01.75.75zm2.25-.75a.75.75 0 00-.75.75v9a.75.75 0 101.5 0v-9a.75.75 0 00-.75-.75zm3 0a.75.75 0 00-.75.75v9a.75.75 0 101.5 0v-9a.75.75 0 00-.75-.75z"
					{...props}
				/>
			</svg>
		);
	}
}
