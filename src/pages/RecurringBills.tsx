import ContentWrapper from '../components/ContentWrapper';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useMemo, useState } from 'react';
import { RecurringBillsTable } from '../components/recurringBillsTable';
import {
	useRecurringBillsStore,
	type RecurringBill,
} from '../stores/recurringBills';
import formatPrice from '../utils/formatPrice';
import { Pagination } from '../components/Pagination';
import type { Sort } from '../types/sort';
import search from '../utils/search';
import sortBy from '../utils/sort';

const PAGE_SIZE = 10;

export interface dataType {
	nodes: RecurringBill[];
}

export default function RecurringBills() {
	const recurringBills = useRecurringBillsStore((s) => s.recurringBills);
	const [query, setQuery] = useState<string>('');
	const [sort, setSort] = useState<Sort>('latest');
	const getBillsSummary = useRecurringBillsStore((s) => s.getBillsSummary);
	const summary = getBillsSummary();

	const queriedBills = useMemo(
		() => search(recurringBills, query),
		[query, recurringBills]
	);
	const sortedBills = useMemo(
		() => sortBy(queriedBills, sort),
		[sort, queriedBills]
	);

	const data: dataType = { nodes: sortedBills };

	const [page, setPage] = useState<number>(0);
	const pagination = usePagination(data, {
		state: { page, size: PAGE_SIZE },
		onChange: onPaginationChange,
	});
	function onPaginationChange(_action: unknown, state: unknown) {
		const { page } = state as { page: number; size: number };
		setPage(page);
	}
	const totalPages = Math.ceil(sortedBills.length / PAGE_SIZE);

	return (
		<ContentWrapper title="Recurring Bills" addButton={null}>
			<div className="grid h-full grid-rows-[auto_auto_1fr] gap-3 sm:grid-cols-2 sm:grid-rows-[auto_1fr] xl:grid-cols-[auto_1fr] xl:items-start">
				<div className="flex items-center gap-6 rounded-xl bg-gray-900 px-5 py-6 sm:grid sm:content-end sm:gap-9.5 sm:p-6 xl:min-w-80">
					<div>
						<svg
							width={32}
							height={27}
							viewBox="0 0 32 27"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M24.375 9.688a.938.938 0 01-.938.937h-15a.938.938 0 010-1.875h15a.937.937 0 01.938.938zm-.938 4.062h-15a.938.938 0 000 1.875h15a.938.938 0 000-1.875zm8.438-11.563v23.75a.938.938 0 01-1.356.84l-4.581-2.291-4.582 2.29a.938.938 0 01-.837 0l-4.581-2.29-4.582 2.29a.938.938 0 01-.837 0l-4.582-2.29-4.58 2.29A.938.938 0 010 25.939V2.188A2.188 2.188 0 012.188 0h27.5a2.187 2.187 0 012.187 2.188zm-1.875 0a.312.312 0 00-.313-.312h-27.5a.312.312 0 00-.312.313V24.42l3.644-1.822a.938.938 0 01.837 0l4.582 2.291 4.58-2.29a.938.938 0 01.838 0l4.581 2.29 4.582-2.29a.938.938 0 01.837 0L30 24.42V2.187z"
								className="fill-white"
							/>
						</svg>
					</div>
					<div className="grid gap-3">
						<h2 className="text-sm leading-normal text-white">Total Bills</h2>
						<p className="text-[2rem] leading-tight font-bold text-white">
							${formatPrice(summary.totalBills)}
						</p>
					</div>
				</div>

				<div className="grid gap-5 rounded-xl bg-white p-5 xl:col-start-1 xl:min-w-80 xl:content-start">
					<h2 className="leading-normal font-bold text-gray-900">Summary</h2>
					<div className="grid gap-4">
						<div className="flex items-center justify-between">
							<h3 className="text-xs leading-normal text-gray-500">
								Paid Bills
							</h3>
							<p className="text-xs leading-normal font-bold text-gray-900">
								<span aria-label="Paid bills count">
									{summary.paidBills.count}{' '}
								</span>
								<span>(${formatPrice(summary.paidBills.total)})</span>
							</p>
						</div>
						<hr className="text-gray-300" />
						<div className="flex items-center justify-between">
							<h3 className="text-xs leading-normal text-gray-500">
								Total Upcoming
							</h3>
							<p className="text-xs leading-normal font-bold text-gray-900">
								<span aria-label="Total upcoming count">
									{summary.totalUpcoming.count}{' '}
								</span>
								<span>(${formatPrice(summary.totalUpcoming.total)})</span>
							</p>
						</div>
						<hr className="text-gray-300" />
						<div className="flex items-center justify-between">
							<h3 className="text-red text-xs leading-normal">Due Soon</h3>
							<p className="text-red text-xs leading-normal font-bold">
								<span aria-label="Due soon count">
									{summary.dueSoon.count}{' '}
								</span>
								<span>(${formatPrice(summary.dueSoon.total)})</span>
							</p>
						</div>
					</div>
				</div>

				<div className="grid h-full grid-rows-[auto_1fr_auto] gap-6 overflow-hidden rounded-lg bg-white px-5 py-6 sm:col-start-1 sm:col-end-3 sm:p-8 xl:col-start-2 xl:row-start-1 xl:row-end-3">
					<div className="flex items-center gap-6">
						<div className="border-beige-500 relative mr-auto flex w-full max-w-80 items-center justify-between gap-4 rounded-lg border px-5 py-3 hover:border-gray-900">
							<input
								className="w-full overflow-hidden text-ellipsis"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								type="search"
								placeholder="Search bills"
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

						<div className="hidden justify-self-end text-sm leading-normal sm:flex sm:items-center sm:gap-2">
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

						<button className="justify-self-end sm:hidden">
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
					</div>

					<RecurringBillsTable data={data} pagination={pagination} />

					<Pagination totalPages={totalPages} page={page} setPage={setPage} />
				</div>
			</div>
		</ContentWrapper>
	);
}
