import { Outlet } from 'react-router-dom';
import Sidebar from '../components/ui/Sidebar';

export default function MainWrapper() {
	return (
		<div className="flex h-dvh flex-col lg:flex-row-reverse">
			<div className="flex-1 overflow-y-auto">
				<Outlet />
			</div>

			<div className="shrink-0">
				<Sidebar />
			</div>
		</div>
	);
}
