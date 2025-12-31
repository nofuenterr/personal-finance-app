import { Outlet } from 'react-router-dom';

export default function MainWrapper() {
	return (
		<>
			<div>Sidebar Nav</div>
			<Outlet />
		</>
	);
}
