import { Tooltip } from 'radix-ui';
import type { ReactNode } from 'react';

interface TooltipComponentProps {
	content: string;
	children: ReactNode;
}

export default function TooltipComponent({
	content,
	children,
}: TooltipComponentProps) {
	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content
						className="bg-turquoise rounded-sm px-4 py-2 font-bold text-white shadow duration-400 ease-in-out will-change-transform select-none"
						sideOffset={5}
					>
						{content}
						<Tooltip.Arrow className="fill-blue" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
}
