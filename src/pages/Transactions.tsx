import ContentWrapper from '../components/ContentWrapper';
import { useTransactionsStore, type Transaction } from '../stores/transactions';
import formatDate from '../utils/formatDate';
import formatPrice from '../utils/formatPrice';
import isIncome from '../utils/isIncome';
import {
	Table,
	Header,
	HeaderRow,
	Body,
	Row,
	HeaderCell,
	Cell,
} from '@table-library/react-table-library/table';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useTheme } from '@table-library/react-table-library/theme';
import { useState, useMemo } from 'react';
import { THEME } from '../theme/tableTheme';
import search from '../utils/search';
import sortBy from '../utils/sort';
import type { Sort } from '../types/sort';
import type { Filter } from '../utils/filterTransactions';
import filterTransactions from '../utils/filterTransactions';

const PAGE_SIZE = 10;

export default function Transactions() {
	const transactions = useTransactionsStore((s) => s.transactions);
	const [query, setQuery] = useState<string>('');
	const [sort, setSort] = useState<Sort>('latest');
	const [category, setCategory] = useState<Filter>('All Transactions');
	const queriedTransactions = useMemo(
		() => search(transactions, query),
		[query, transactions]
	);
	const filteredTransactions = useMemo(
		() => filterTransactions(queriedTransactions, category),
		[category, queriedTransactions]
	);
	const sortedTransactions = useMemo(
		() => sortBy(filteredTransactions, sort),
		[sort, filteredTransactions]
	);

	const data = { nodes: sortedTransactions };
	const theme = useTheme(THEME);

	const [page, setPage] = useState(0);
	const pagination = usePagination(data, {
		state: { page, size: PAGE_SIZE },
		onChange: onPaginationChange,
	});
	function onPaginationChange(action: any, state: any) {
		setPage(state.page);
	}

	const totalPages = Math.ceil(sortedTransactions.length / PAGE_SIZE);

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
		<ContentWrapper title="Transactions" addButton={null}>
			<div className="flex h-full flex-col gap-6 overflow-hidden rounded-lg bg-white px-5 py-6 md:p-8">
				<div className="flex items-center gap-6">
					<div className="border-beige-500 relative mr-auto flex w-full max-w-80 items-center justify-between gap-4 rounded-lg border px-5 py-3 hover:border-gray-900">
						<input
							className="w-full overflow-hidden text-ellipsis"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							type="search"
							placeholder="Search transaction"
						/>
						<svg
							width={14}
							height={14}
							viewBox="0 0 14 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="shrink-0"
						>
							<path
								d="M12.868 12.16l-3.13-3.129a5.507 5.507 0 10-.707.707l3.13 3.13a.5.5 0 00.707-.708zM1.014 5.514a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z"
								className="fill-gray-900"
							/>
						</svg>
					</div>

					<div className="hidden text-sm leading-normal sm:flex sm:items-center sm:gap-2">
						<label className="text-nowrap text-gray-500" htmlFor="sort">
							Sort by
						</label>
						<select
							className="border-beige-500 cursor-pointer rounded-lg border bg-white px-5 py-3 text-gray-900 open:border-gray-900 hover:border-gray-500"
							name="sort"
							id="sort"
							onChange={(e) => {
								const value = e.target.value as Sort;
								setSort(value);
							}}
						>
							<option className="" value="latest">
								Latest
							</option>
							<option className="" value="oldest">
								Oldest
							</option>
							<option className="" value="a-z">
								A to Z
							</option>
							<option className="" value="z-a">
								Z to A
							</option>
							<option className="" value="lowest">
								Lowest
							</option>
							<option className="" value="highest">
								Highest
							</option>
						</select>
					</div>

					<button className="sm:hidden">
						<svg
							width={15}
							height={15}
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M13.75 0H1.25A1.25 1.25 0 000 1.25v12.5A1.25 1.25 0 001.25 15h12.5A1.25 1.25 0 0015 13.75V1.25A1.25 1.25 0 0013.75 0zM3.125 3.125h7.5a.625.625 0 110 1.25h-7.5a.625.625 0 010-1.25zm3.125 8.75H3.125a.625.625 0 110-1.25H6.25a.625.625 0 110 1.25zm.625-3.75h-3.75a.625.625 0 010-1.25h3.75a.625.625 0 010 1.25zm6.067 2.317l-1.875 1.875a.627.627 0 01-.884 0l-1.875-1.875a.625.625 0 01.884-.884l.808.808V6.875a.625.625 0 111.25 0v3.491l.808-.808a.625.625 0 01.884.884z"
								className="fill-gray-900"
							/>
						</svg>
					</button>

					<div className="hidden text-sm leading-normal sm:flex sm:items-center sm:gap-2">
						<label className="text-gray-500" htmlFor="category">
							Category
						</label>
						<select
							onChange={(e) => {
								const value = e.target.value as Filter;
								setCategory(value);
							}}
							className="border-beige-500 cursor-pointer rounded-lg border bg-white px-5 py-3 text-gray-900 open:border-gray-900 hover:border-gray-500"
							name="category"
							id="category"
						>
							<option value="All Transactions">All Transactions</option>
							<option value="General">General</option>
						</select>
					</div>

					<button className="sm:hidden">
						<svg
							width={17}
							height={15}
							viewBox="0 0 17 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M15.92 2.09l-.006.008-5.291 5.65v4.335a1.251 1.251 0 01-.557 1.042l-2.5 1.667a1.25 1.25 0 01-1.943-1.042V7.748L.33 2.098.325 2.09A1.25 1.25 0 011.248 0h13.75a1.25 1.25 0 01.925 2.09h-.003z"
								className="fill-gray-900"
							/>
						</svg>
					</button>
				</div>

				<div className="flex-1 overflow-y-auto">
					<Table
						data={data}
						theme={theme}
						pagination={pagination}
						layout={{ fixedHeader: true }}
					>
						{(tableList) => (
							<>
								<Header>
									<HeaderRow>
										<HeaderCell>Recipient / Sender</HeaderCell>
										<HeaderCell>Category</HeaderCell>
										<HeaderCell>Transaction Date</HeaderCell>
										<HeaderCell>Amount</HeaderCell>
									</HeaderRow>
								</Header>
								<Body>
									{tableList.map((item: Transaction) => (
										<Row key={item.id} item={item}>
											<Cell>
												<div className="avatar-wrapper">
													<img src={item.avatar} alt={item.name + ' avatar'} />
												</div>
												<span>{item.name}</span>
											</Cell>
											<Cell>{item.category}</Cell>
											<Cell>{formatDate(item.date)}</Cell>
											<Cell>
												<span
													className={
														isIncome(item.amount) ? 'income' : 'expense'
													}
												>
													{isIncome(item.amount) ? '+' : '-'}$
													{formatPrice(Math.abs(item.amount))}
												</span>
											</Cell>
										</Row>
									))}
								</Body>
							</>
						)}
					</Table>
				</div>

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
			</div>
		</ContentWrapper>
	);
}
