import type { PageServerLoad } from './$types';
import type { ApiResult } from '$lib/type/result';
import type { ProcessedSchoolInfo } from '$lib/type/school';
import type { ProcessedMealServiceDietInfo } from '$lib/type/meal';

export const prerender = false;

export const load: PageServerLoad = async ({ fetch }) => {
	const schoolName = import.meta.env.VITE_SCHOOL_NAME;

	const schoolInfoRes: ApiResult<ProcessedSchoolInfo> = await (await fetch(`/api/schoolInfo?schoolName=${schoolName}`)).json();

	if (!schoolInfoRes.success) {
		console.error(schoolInfoRes);
		return {
			schoolInfo: null,
			mealInfo: null
		};
	}

	const schoolInfo = schoolInfoRes.data;

	if (schoolInfo.totalSchools > 1) {
		return {
			schoolInfo,
			mealInfo: null
		};
	}

	const mealInfoRes: ApiResult<ProcessedMealServiceDietInfo> = await (await fetch(`/api/mealInfo?schoolCode=${schoolInfo.schools[0].school.code}&educationOfficeCode=${schoolInfo.schools[0].educationOffice.code}&date=20240902`)).json();

	return {
		schoolInfo,
		mealInfo: mealInfoRes.success ? mealInfoRes.data : null
	};
};

export const config = {
	isr: {
		expiration: 60 * 60 // 1 hour in seconds
	}
};