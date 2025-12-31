export default function formatPrice(price: number): string {
	let counter: number = 0;
	const parsedPrice: string[] = [];

	const normalizedPrice: string = price.toFixed(2);

	normalizedPrice
		.split('')
		.reverse()
		.forEach((c: string): void => {
			if (counter === 3) {
				parsedPrice.push(',');
				counter = 0;
			}
			parsedPrice.push(c);
			if (c === '.') {
				counter = 0;
			} else {
				counter += 1;
			}
		});

	return parsedPrice.reverse().join('');
}
