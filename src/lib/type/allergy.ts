export enum AllergyInfo {
	Egg = 1,
	Milk,
	Buckwheat,
	Peanut,
	Soybean,
	Wheat,
	Mackerel,
	Crab,
	Shrimp,
	Pork,
	Peach,
	Tomato,
	SulfurDioxide,
	Walnut,
	Chicken,
	Beef,
	Squid,
	Shellfish,
	PineNut
}

export interface MealInfo {
	name: string;
	allergies: AllergyInfo[];
}

export function parseMealAllergies(mealList: string[]): MealInfo[] {
	return mealList.map(meal => {
		const match = meal.match(/^(.+?)(?:\s*\(([\d.,]+)\))?$/);
		if (!match) {
			return { name: meal, allergies: [] };
		}

		const [, name, allergyString] = match;
		const allergies = allergyString
			? allergyString.split(/[.,]/).map(num => parseInt(num, 10)).filter(num => !isNaN(num))
			: [];

		return {
			name: name.trim(),
			allergies: allergies.map(num => AllergyInfo[AllergyInfo[num] as keyof typeof AllergyInfo])
		};
	});
}