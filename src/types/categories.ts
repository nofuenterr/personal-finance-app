export const Categories = {
	General: 'General',
	Shopping: 'Shopping',
	Lifestyle: 'Lifestyle',
	Education: 'Education',
	PersonalCare: 'Personal Care',
	Transportation: 'Transportation',
	DiningOut: 'Dining Out',
	Groceries: 'Groceries',
	Bills: 'Bills',
	Entertainment: 'Entertainment',
} as const;

export type Categories = (typeof Categories)[keyof typeof Categories];
