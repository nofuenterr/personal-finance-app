import { Pie, PieChart } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useBudgetsStore, type Budget } from '../../stores/budgets';
import formatPrice from '../../utils/formatPrice';
import type { Categories } from '../../types/categories';

/* const data = [
  { name: 'Group A', value: 400, fill: '#0088FE' },
  { name: 'Group B', value: 300, fill: '#00C49F' },
  { name: 'Group C', value: 300, fill: '#FFBB28' },
  { name: 'Group D', value: 200, fill: '#FF8042' },
]; */

interface dataTypes {
	[key: string]: Categories | number | string;
	name: Categories;
	value: number;
	fill: string;
}

export default function BudgetsChart({
	isAnimationActive = true,
	budgets,
}: {
	isAnimationActive?: boolean;
	budgets: Budget[];
}) {
	const totalSpent = useBudgetsStore((s) => s.getTotalSpent());
	const totalLimit = useBudgetsStore((s) => s.getTotalLimit());

	const data: dataTypes[] = budgets.map((budget) => {
		return {
			name: budget.category,
			value: budget.spent,
			fill: `var(--color-${budget.theme})`,
		};
	});

	const renderCenterLabel = () => {
		return (
			<text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
				<tspan
					x="50%"
					dy="-0.2em"
					className="fill-gray-900 text-[2rem] leading-normal font-bold"
				>
					${formatPrice(totalSpent)}
				</tspan>
				<tspan
					x="50%"
					dy="2.5em"
					className="fill-gray-500 text-xs leading-normal"
				>
					of ${formatPrice(totalLimit)} limit
				</tspan>
			</text>
		);
	};

	return (
		<PieChart
			style={{
				width: '100%',
				maxWidth: '500px',
				maxHeight: '80vh',
				minWidth: '240px',
				minHeight: '240px',
			}}
		>
			<Pie
				data={data}
				innerRadius="80%"
				outerRadius="100%"
				cornerRadius="50%"
				paddingAngle={5}
				dataKey="value"
				isAnimationActive={isAnimationActive}
			>
				{renderCenterLabel()}
			</Pie>

			<RechartsDevtools />
		</PieChart>
	);
}
