import { useState, useMemo } from 'react';
import ContentWrapper from '../components/ContentWrapper';
import { Pagination } from '../components/Pagination';
import { TransactionsTable } from '../components/TransactionsTable';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useTransactionsStore, type Transaction } from '../stores/transactions';
import filterTransactions from '../utils/filterTransactions';
import type { Filter } from '../utils/filterTransactions';
import type { Sort } from '../types/sort';
import search from '../utils/search';
import sortBy from '../utils/sort';

const PAGE_SIZE = 10;

export interface dataType {
	nodes: Transaction[];
}

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

	const data: dataType = { nodes: sortedTransactions };

	const [page, setPage] = useState<number>(0);
	const pagination = usePagination(data, {
		state: { page, size: PAGE_SIZE },
		onChange: onPaginationChange,
	});
	function onPaginationChange(_action: unknown, state: unknown) {
		const { page } = state as { page: number; size: number };
		setPage(page);
	}
	const totalPages = Math.ceil(transactions.length / PAGE_SIZE);

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

				<TransactionsTable data={data} pagination={pagination} />

				<Pagination totalPages={totalPages} page={page} setPage={setPage} />
			</div>
		</ContentWrapper>
	);
}
