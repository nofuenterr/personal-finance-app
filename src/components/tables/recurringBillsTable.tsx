import { format } from 'date-fns';
import formatPrice from '../../utils/formatPrice';
import {
	Table,
	Header,
	HeaderRow,
	Body,
	Row,
	HeaderCell,
	Cell,
} from '@table-library/react-table-library/table';
import type { Pagination } from '@table-library/react-table-library/types/pagination';
import { useTheme } from '@table-library/react-table-library/theme';
import { THEME } from '../../theme/recurringBillsTableTheme';
import type { dataType } from '../../pages/RecurringBills';
import { isDueSoon, type RecurringBill } from '../../stores/recurringBills';

interface RecurringBillsTableProps {
	data: dataType;
	pagination: Pagination<RecurringBill>;
}

export function RecurringBillsTable({
	data,
	pagination,
}: RecurringBillsTableProps) {
	const theme = useTheme(THEME);

	const getDayOfTheMonth = (date: string): string => {
		return format(new Date(date), 'do');
	};

	return (
		<div className="grid h-full flex-1 content-start overflow-y-auto">
			<Table
				data={data}
				theme={theme}
				pagination={pagination}
				layout={{ fixedHeader: true }}
			>
				{(tableList: RecurringBill[]) => (
					<>
						<Header>
							<HeaderRow>
								<HeaderCell>Bill Title</HeaderCell>
								<HeaderCell>Due Date</HeaderCell>
								<HeaderCell>Amount</HeaderCell>
							</HeaderRow>
						</Header>
						<Body>
							{tableList.map((item: RecurringBill) => (
								<Row key={item.id} item={item}>
									<Cell>
										<div className="avatar-wrapper">
											<img src={item.avatar} alt={item.name + ' avatar'} />
										</div>
										<span>{item.name}</span>
									</Cell>
									<Cell>
										{item.interval}-{getDayOfTheMonth(item.date)}
										{item.paid ? (
											<svg
												width={13}
												height={13}
												viewBox="0 0 13 13"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M6.5 0A6.5 6.5 0 1013 6.5 6.507 6.507 0 006.5 0zm2.854 5.354l-3.5 3.5a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 11.708-.708L5.5 7.793l3.146-3.147a.5.5 0 11.708.708z"
													className="fill-green"
												/>
											</svg>
										) : isDueSoon(item.date) ? (
											<svg
												width={13}
												height={13}
												viewBox="0 0 13 13"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M6.5 0A6.5 6.5 0 1013 6.5 6.507 6.507 0 006.5 0zM6 3.5a.5.5 0 111 0V7a.5.5 0 11-1 0V3.5zm.5 6.5a.75.75 0 110-1.5.75.75 0 010 1.5z"
													className="fill-red"
												/>
											</svg>
										) : null}
									</Cell>
									<Cell>
										<span
											className={
												!item.paid && isDueSoon(item.date) ? 'due-soon' : ''
											}
										>
											${formatPrice(item.amount)}
										</span>
									</Cell>
								</Row>
							))}
						</Body>
					</>
				)}
			</Table>
		</div>
	);
}
