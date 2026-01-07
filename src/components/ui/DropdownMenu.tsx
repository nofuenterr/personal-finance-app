import { DropdownMenu } from 'radix-ui';
import type { Dispatch, ReactNode } from 'react';
import type { PotDialogAction } from '../../pages/Pots';
import { type Pot } from '../../stores/pots';

interface DropdownMenuProps {
	item: 'Pot' | 'Budget';
	children: ReactNode;
	setDialog: Dispatch<React.SetStateAction<PotDialogAction>>;
	pot: Pot;
}

export default function DropdownMenuComponent({
	item,
	children,
	setDialog,
	pot,
}: DropdownMenuProps) {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className="grid gap-3 rounded-lg bg-white px-5 py-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
					sideOffset={5}
				>
					<DropdownMenu.Item disabled>
						<button
							onClick={() => setDialog({ type: 'edit', pot })}
							className="cursor-pointer text-sm leading-normal text-gray-900"
						>
							Edit {item}
						</button>
					</DropdownMenu.Item>

					<DropdownMenu.Separator className="h-px bg-gray-100" />

					<DropdownMenu.Item disabled>
						<button
							onClick={() => setDialog({ type: 'delete', pot })}
							className="text-red cursor-pointer text-sm leading-normal"
						>
							Delete {item}
						</button>
					</DropdownMenu.Item>

					<DropdownMenu.Arrow className="fill-gray-900" />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}
