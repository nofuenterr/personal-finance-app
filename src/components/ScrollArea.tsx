import { ScrollArea } from 'radix-ui';
import type { ReactNode } from 'react';

export default function ScrollAreaComponent({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<ScrollArea.Root className={'h-full flex-1 overflow-hidden'}>
			<ScrollArea.Viewport className={'h-full w-full'}>
				{children}
			</ScrollArea.Viewport>

			<ScrollArea.Scrollbar
				className="flex w-2.5 touch-none bg-gray-300 p-0.5 transition-[background] duration-150 ease-out select-none hover:w-4 hover:bg-gray-300"
				orientation="vertical"
			>
				<ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-500 before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-11 before:w-full before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
			</ScrollArea.Scrollbar>

			<ScrollArea.Corner className="bg-gray-300" />
		</ScrollArea.Root>
	);
}
