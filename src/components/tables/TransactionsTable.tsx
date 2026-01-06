import { type Transaction } from '../../stores/transactions';
import formatDate from '../../utils/formatDate';
import formatPrice from '../../utils/formatPrice';
import isIncome from '../../utils/isIncome';
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
import { THEME } from '../../theme/transactionsTableTheme';
import type { dataType } from '../../pages/Transactions';

interface TransactionsTableProps {
	data: dataType;
	pagination: Pagination<Transaction>;
}

export function TransactionsTable({
	data,
	pagination,
}: TransactionsTableProps) {
	const theme = useTheme(THEME);

	return (
		<div className="grid flex-1 content-start overflow-y-auto">
			<Table
				data={data}
				theme={theme}
				pagination={pagination}
				layout={{ fixedHeader: true }}
			>
				{(tableList: Transaction[]) => (
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
											className={isIncome(item.amount) ? 'income' : 'expense'}
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
	);
}
