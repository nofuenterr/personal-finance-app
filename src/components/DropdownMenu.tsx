import { DropdownMenu } from 'radix-ui';
import type { ReactNode } from 'react';

export default function DropdownMenuComponent({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className="grid gap-3 rounded-lg bg-white px-5 py-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
					sideOffset={5}
				>
					<DropdownMenu.Item>
						<button className="cursor-pointer text-sm leading-normal text-gray-900">
							Edit Pot
						</button>
					</DropdownMenu.Item>

					<DropdownMenu.Separator className="h-px bg-gray-100" />

					<DropdownMenu.Item>
						<button className="text-red cursor-pointer text-sm leading-normal">
							Delete Pot
						</button>
					</DropdownMenu.Item>

					<DropdownMenu.Arrow className="fill-gray-900" />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}
