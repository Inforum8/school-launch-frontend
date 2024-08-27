import { json, type RequestEvent } from '@sveltejs/kit';
import type { ApiResult } from '$lib/type/result';
import ky from 'ky';
import { env } from '$env/dynamic/private';
import type { Nutrition, ProcessedMeal, ProcessedMealServiceDietInfo } from '$lib/type/meal';

export async function GET(event: RequestEvent): Promise<Response> {
	try {
		const url = new URL(event.url);
		const params = url.searchParams;

		const schoolCode = params.get('schoolCode');
		const educationOfficeCode = params.get('educationOfficeCode');
		const mealDate = params.get('date'); // optional, default: today

		if (!schoolCode || !educationOfficeCode) {
			return new Response(
				JSON.stringify(
					{
						success: false,
						status: 400,
						message: '필수 값이 누락되었습니다.'
					} as ApiResult
				),
				{
					status: 400,
					headers: { 'content-type': 'application/json' }
				}
			)
		}

		const reqDate = mealDate ?? formatDateToYYYYMMDD(new Date())

		const mealInfo: MealServiceDietInfo = await ky.get('https://open.neis.go.kr/hub/mealServiceDietInfo', {
			searchParams: {
				KEY: env.NICE_API_KEY,
				Type: 'json',
				pIndex: 1,
				pSize: 100,
				ATPT_OFCDC_SC_CODE: educationOfficeCode,
				SD_SCHUL_CODE: schoolCode,
				MLSV_YMD: reqDate
			},
			headers: { 'content-type': 'application/json', 'Accept': '*/*' }
		}).json();

		return json({
			success: true,
			status: 0,
			data: transformMealServiceDietInfo(mealInfo),
			message: '성공적으로 급식정보를 불러왔습니다.'
		} as ApiResult<ProcessedMealServiceDietInfo>);
	} catch (e: unknown) {
		console.error(e)
		return new Response(JSON.stringify({ message: (e as Error).message }), {
			status: 500,
			headers: { 'content-type': 'application/json' },
		});
	}
}

function formatDateToYYYYMMDD(date: Date) {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');

	return `${year}${month}${day}`;
}

interface HeadItem1 {
	list_total_count: number;
}

interface HeadItem2 {
	RESULT: {
		CODE: string;
		MESSAGE: string;
	};
}

interface MealServiceDietInfo {
	mealServiceDietInfo: [
		{
			head: [
				HeadItem1,
				HeadItem2,
			];
		},
		{
			row: Meal[];
		}
	];
}

interface Meal {
	ATPT_OFCDC_SC_CODE: string; // 시도교육청 코드
	ATPT_OFCDC_SC_NM: string; // 시도교육청명
	SD_SCHUL_CODE: string; // 학교 코드
	SCHUL_NM: string; // 학교명
	MMEAL_SC_CODE: string; // 급식 코드
	MMEAL_SC_NM: string; // 급식 명
	MLSV_YMD: string; // 급식 날짜
	MLSV_FGR: number; // 급식 인원
	DDISH_NM: string; // 급식 메뉴
	ORPLC_INFO: string; // 원산지 정보
	CAL_INFO: string; // 칼로리 정보
	NTR_INFO: string; // 영양 정보
	MLSV_FROM_YMD: string; // 급식 시작 날짜
	MLSV_TO_YMD: string; // 급식 종료 날짜
	LOAD_DTM: string; // 데이터 수정 일자
}

function transformMealServiceDietInfo(data: MealServiceDietInfo): ProcessedMealServiceDietInfo {
	console.log(data)

	const [head, body] = data.mealServiceDietInfo;
	const headItem1 = head.head[0]
	const headItem2 = head.head[1]

	const { list_total_count } = headItem1;
	const { CODE, MESSAGE } = headItem2.RESULT;

	const meals: ProcessedMeal[] = body.row.map((meal) => ({
		educationOffice: {
			code: meal.ATPT_OFCDC_SC_CODE,
			name: meal.ATPT_OFCDC_SC_NM,
		},
		school: {
			code: meal.SD_SCHUL_CODE,
			name: meal.SCHUL_NM,
		},
		mealType: {
			code: meal.MMEAL_SC_CODE,
			name: meal.MMEAL_SC_NM,
		},
		date: meal.MLSV_YMD,
		servingCount: meal.MLSV_FGR,
		menu: meal.DDISH_NM,
		originInfo: meal.ORPLC_INFO,
		calorie: meal.CAL_INFO,
		nutrition: parseNutrition(meal.NTR_INFO),
		loadDate: meal.LOAD_DTM,
	}));

	return {
		totalMeals: list_total_count,
		result: {
			code: CODE,
			message: MESSAGE,
		},
		meals,
	};
}

function parseNutrition(ntrInfo: string): Nutrition {
	const nutritionEntries = ntrInfo.split('\n');
	const nutritionMap: { [key: string]: string } = {};

	nutritionEntries.forEach(entry => {
		const [key, value] = entry.split(':').map(str => str.trim());
		if (key && value) {
			nutritionMap[key] = value;
		}
	});

	return {
		carbohydrate: nutritionMap['탄수화물(g)'] || '',
		protein: nutritionMap['단백질(g)'] || '',
		fat: nutritionMap['지방(g)'] || '',
		vitaminA: nutritionMap['비타민A(R.E)'] || '',
		thiamine: nutritionMap['티아민(mg)'] || '',
		riboflavin: nutritionMap['리보플라빈(mg)'] || '',
		vitaminC: nutritionMap['비타민C(mg)'] || '',
		calcium: nutritionMap['칼슘(mg)'] || '',
		iron: nutritionMap['철분(mg)'] || '',
	};
}
