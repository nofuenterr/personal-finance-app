import { AlertDialog } from 'radix-ui';
import type { ReactNode } from 'react';

interface AlertDialogProps {
	name: string;
	type: string;
	children: ReactNode;
}

export default function AlertDialogComponent({
	name,
	type,
	children,
}: AlertDialogProps) {
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.5)] opacity-0 transition-opacity duration-150 ease-out data-[state=open]:opacity-100" />
				<AlertDialog.Content className="fixed inset-0 m-auto grid h-max w-[90vw] max-w-140 gap-5 rounded-xl bg-white px-5 py-6 drop-shadow-[0_8px_24px_rgba(0,0,0,0.05)] focus:outline-none focus-visible:outline-none md:p-8">
					<div className="flex items-center justify-between">
						<AlertDialog.Title className="text-xl leading-tight font-bold text-gray-900 md:text-[2rem]">
							Delete '{name}'
						</AlertDialog.Title>
						<AlertDialog.Cancel asChild>
							<button className="cursor-pointer" aria-label="Close">
								<svg
									width={26}
									height={26}
									viewBox="0 0 26 26"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M17.28 9.28l-3.47 3.47 3.47 3.47a.75.75 0 11-1.06 1.06l-3.47-3.47-3.47 3.47a.75.75 0 01-1.06-1.06l3.47-3.47-3.47-3.47a.75.75 0 011.06-1.06l3.47 3.47 3.47-3.47a.75.75 0 011.06 1.06zm8.22 3.47A12.75 12.75 0 1112.75 0 12.765 12.765 0 0125.5 12.75zm-1.5 0A11.25 11.25 0 1012.75 24 11.262 11.262 0 0024 12.75z"
										fill="currentColor"
									/>
								</svg>
							</button>
						</AlertDialog.Cancel>
					</div>
					<AlertDialog.Description className="text-sm leading-normal text-gray-500">
						Are you sure you want to delete this {type}? This action cannot be
						reversed, and all the data inside it will be removed forever.
					</AlertDialog.Description>
					<AlertDialog.Cancel asChild>
						<button className="bg-red cursor-pointer rounded-lg px-6 py-4 text-sm leading-normal font-bold text-white hover:opacity-80">
							Yes, Confirm Deletion
						</button>
					</AlertDialog.Cancel>
					<AlertDialog.Action asChild>
						<button className="cursor-pointer text-sm leading-normal text-gray-500 hover:text-gray-900">
							No, Go Back
						</button>
					</AlertDialog.Action>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
}
