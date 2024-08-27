export interface ProcessedMealServiceDietInfo {
	totalMeals: number;
	result: {
		code: string;
		message: string;
	};
	meals: ProcessedMeal[];
}

export interface ProcessedMeal {
	educationOffice: {
		code: string;
		name: string;
	};
	school: {
		code: string;
		name: string;
	};
	mealType: {
		code: string;
		name: string;
	};
	date: string;
	servingCount: number;
	menu: string;
	originInfo: string;
	calorie: string;
	nutrition: Nutrition;
	loadDate: string;
}

export interface Nutrition {
	carbohydrate: string;
	protein: string;
	fat: string;
	vitaminA: string;
	thiamine: string;
	riboflavin: string;
	vitaminC: string;
	calcium: string;
	iron: string;
}