import { Outlet } from 'react-router-dom';
import Sibebar from '../components/Sidebar';

export default function MainWrapper() {
	return (
		<div className="flex h-dvh flex-col lg:flex-row-reverse">
			<main className="flex-1">
				<Outlet />
			</main>
			<Sibebar />
		</div>
	);
}
