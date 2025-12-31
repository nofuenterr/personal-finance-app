export default function getPercentage(amount: number, target: number): string {
	return ((amount / target) * 100).toFixed(2) + '%';
}
