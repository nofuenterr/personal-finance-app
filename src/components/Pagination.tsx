import { useMemo, type Dispatch } from 'react';

interface PaginationProps {
	totalPages: number;
	page: number;
	setPage: Dispatch<React.SetStateAction<number>>;
}

export function Pagination({ totalPages, page, setPage }: PaginationProps) {
	function getPaginationRange(current: number, total: number, delta = 1) {
		const range: (number | '...')[] = [];

		const left = Math.max(1, current - delta);
		const right = Math.min(total - 2, current + delta);

		range.push(0);

		if (left > 1) range.push('...');

		for (let i = left; i <= right; i++) {
			range.push(i);
		}

		if (right < total - 2) range.push('...');

		if (total > 1) range.push(total - 1);

		return range;
	}

	const paginationRange = useMemo(
		() => getPaginationRange(page, totalPages),
		[page, totalPages]
	);

	return (
		<div className="flex shrink-0 items-center justify-center gap-2 pt-6 sm:gap-3">
			<button
				onClick={() => setPage((p) => Math.max(p - 1, 0))}
				disabled={page === 0}
				className="group mr-auto flex size-10 cursor-pointer items-center justify-center gap-4 rounded-lg border border-gray-500 bg-white px-4 hover:bg-gray-500 sm:min-w-max"
			>
				<svg
					width={6}
					height={11}
					viewBox="0 0 6 11"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="shrink-0"
				>
					<path
						d="M5.147 10.854l-5-5a.5.5 0 010-.707l5-5A.5.5 0 016 .5v10a.5.5 0 01-.853.354z"
						className="fill-gray-500 group-hover:fill-white"
					/>
				</svg>
				<span className="hidden text-sm leading-normal text-gray-900 group-hover:text-white sm:inline">
					Prev
				</span>
			</button>

			<div className="flex flex-wrap items-center justify-center gap-2 *:grid *:size-10 *:place-content-center *:rounded-lg *:border *:border-gray-500 *:bg-white *:text-sm *:leading-normal *:text-gray-900">
				{paginationRange.map((item, index) =>
					item === '...' ? (
						<span
							key={`ellipsis-${index}`}
							className="hover:cursor-not-allowed"
						>
							…
						</span>
					) : (
						<button
							key={item}
							onClick={() => setPage(item)}
							aria-current={page === item ? 'page' : undefined}
							className="cursor-pointer hover:bg-gray-500 hover:text-white aria-[current]:bg-gray-900 aria-[current]:text-white"
						>
							{item + 1}
						</button>
					)
				)}
			</div>

			<button
				onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
				disabled={page === totalPages - 1}
				className="group ml-auto flex size-10 cursor-pointer items-center justify-center gap-4 rounded-lg border border-gray-500 bg-white px-4 hover:bg-gray-500 sm:min-w-max"
			>
				<span className="hidden text-sm leading-normal text-gray-900 group-hover:text-white sm:inline">
					Next
				</span>
				<svg
					width={6}
					height={11}
					viewBox="0 0 6 11"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="shrink-0"
				>
					<path
						d="M.854.147l5 5a.5.5 0 010 .707l-5 5A.5.5 0 010 10.5V.5A.5.5 0 01.854.147z"
						className="fill-gray-500 group-hover:fill-white"
					/>
				</svg>
			</button>
		</div>
	);
}
