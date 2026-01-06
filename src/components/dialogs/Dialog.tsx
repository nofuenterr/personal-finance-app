import { Dialog } from 'radix-ui';
import type { ReactNode } from 'react';

interface DialogProps {
	trigger: ReactNode;
	title: string;
	description: string;
	buttonText: string;
	children: ReactNode;
}

export default function DialogComponent({
	trigger,
	title,
	description,
	buttonText,
	children,
}: DialogProps) {
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,0.5)] opacity-0 transition-opacity duration-150 ease-out data-[state=open]:opacity-100" />
				<Dialog.Content className="fixed inset-0 m-auto grid h-max w-[90vw] max-w-140 gap-5 rounded-xl bg-white px-5 py-6 drop-shadow-[0_8px_24px_rgba(0,0,0,0.05)] focus:outline-none focus-visible:outline-none md:p-8">
					{' '}
					{/* insert animation here */}
					<div className="flex items-center justify-between">
						<Dialog.Title className="text-xl leading-tight font-bold text-gray-900 md:text-[2rem]">
							{title}
						</Dialog.Title>
						<Dialog.Close asChild>
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
						</Dialog.Close>
					</div>
					<Dialog.Description className="text-sm leading-normal text-gray-500">
						{description}
					</Dialog.Description>
					{children}
					<Dialog.Close asChild>
						<button className="w-full cursor-pointer rounded-lg bg-gray-900 px-6 py-4 text-sm leading-normal font-bold text-white hover:bg-gray-500">
							{buttonText}
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
