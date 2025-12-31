import { format } from 'date-fns';

export default function formatDate(date: string): string {
	return format(new Date(date), 'dd MMM yyyy');
}
