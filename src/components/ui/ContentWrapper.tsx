import type { ReactNode } from 'react';

interface ContentWrapperProps {
	title: string;
	addButton: ReactNode | null;
	children: ReactNode;
}

export default function ContentWrapper({
	title,
	addButton,
	children,
}: ContentWrapperProps) {
	return (
		<div className="bg-beige-100 grid h-full flex-1 grid-rows-[auto_1fr] content-start items-start gap-8 px-4 py-6 md:px-10 md:py-8">
			<header className="flex items-center justify-between gap-2">
				<h1 className="text-[2rem] leading-tight font-bold text-gray-900">
					{title}
				</h1>
				{addButton}
			</header>
			<main className="h-full flex-1 overflow-hidden">{children}</main>
		</div>
	);
}
