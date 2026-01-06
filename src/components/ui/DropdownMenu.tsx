import { DropdownMenu } from 'radix-ui';
import type { ReactNode } from 'react';
import Dialog from '../dialogs/Dialog';
import AlertDialog from '../dialogs/AlertDialog';

interface DropdownMenuProps {
	name: string;
	type: 'pot' | 'budget';
	typeCapitalized: 'Pot' | 'Budget';
	editDescription: string;
	editContent: ReactNode;
	children: ReactNode;
}

export default function DropdownMenuComponent({
	name,
	type,
	typeCapitalized,
	editDescription,
	editContent,
	children,
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
						<Dialog
							trigger={
								<button className="cursor-pointer text-sm leading-normal text-gray-900">
									Edit {typeCapitalized}
								</button>
							}
							title={`Edit ${typeCapitalized}`}
							description={editDescription}
							buttonText="Save Changes"
						>
							{editContent}
						</Dialog>
					</DropdownMenu.Item>

					<DropdownMenu.Separator className="h-px bg-gray-100" />

					<DropdownMenu.Item disabled>
						<AlertDialog name={name} type={type}>
							<button className="text-red cursor-pointer text-sm leading-normal">
								Delete {typeCapitalized}
							</button>
						</AlertDialog>
					</DropdownMenu.Item>

					<DropdownMenu.Arrow className="fill-gray-900" />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}
