export interface AllergyInfo {
	id: number;
	name: string;
	icon: string;
}

// 이후에 좀 더 나은 매핑 방식 사용할 필요가 있음
export const allergyInfoMap: Map<number, AllergyInfo> = new Map([
	[1, { id: 1, name: "난류", icon: "/icons/egg.svg" }],
	[2, { id: 2, name: "우유", icon: "/icons/milk.svg" }],
	[3, { id: 3, name: "메밀", icon: "/icons/buckwheat.svg" }],
	[4, { id: 4, name: "땅콩", icon: "/icons/peanut.svg" }],
	[5, { id: 5, name: "대두", icon: "/icons/soybean.svg" }],
	[6, { id: 6, name: "밀", icon: "/icons/wheat.svg" }],
	[7, { id: 7, name: "고등어", icon: "/icons/mackerel.svg" }],
	[8, { id: 8, name: "게", icon: "/icons/crab.svg" }],
	[9, { id: 9, name: "새우", icon: "/icons/shrimp.svg" }],
	[10, { id: 10, name: "돼지고기", icon: "/icons/pork.svg" }],
	[11, { id: 11, name: "복숭아", icon: "/icons/peach.svg" }],
	[12, { id: 12, name: "토마토", icon: "/icons/tomato.svg" }],
	[13, { id: 13, name: "아황산염", icon: "/icons/sulfur-dioxide.svg" }],
	[14, { id: 14, name: "호두", icon: "/icons/walnut.svg" }],
	[15, { id: 15, name: "닭고기", icon: "/icons/chicken.svg" }],
	[16, { id: 16, name: "쇠고기", icon: "/icons/beef.svg" }],
	[17, { id: 17, name: "오징어", icon: "/icons/squid.svg" }],
	[18, { id: 18, name: "조개류", icon: "/icons/shellfish.svg" }],
	[19, { id: 19, name: "잣", icon: "/icons/pine-nut.svg" }]
]);

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
			allergies: allergies.map(num => allergyInfoMap.get(num)!).filter(Boolean)
		};
	});
}