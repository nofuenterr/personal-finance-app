import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainWrapper from './pages/MainWrapper';
import Error from './pages/Error';
import Transactions from './pages/Transactions';
import Overview from './pages/Overview';
import Budgets from './pages/Budgets';
import Pots from './pages/Pots';
import RecurringBills from './pages/RecurringBills';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MainWrapper />} errorElement={<Error />}>
					<Route errorElement={<Error />}>
						<Route index={true} element={<Overview />} />
						<Route path="/transactions" element={<Transactions />} />
						<Route path="/budgets" element={<Budgets />} />
						<Route path="/pots" element={<Pots />} />
						<Route path="/recurringBills" element={<RecurringBills />} />
					</Route>
				</Route>
			</Routes>
		</Router>
	);
}
