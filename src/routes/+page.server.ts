import type { PageServerLoad } from '../../.svelte-kit/types/src/routes/$types';
import type { ApiResult } from '$lib/type/result';
import type { ProcessedSchoolInfo } from '$lib/type/school';

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export const load: PageServerLoad = async ({ fetch }) => {
	const schoolName = import.meta.env.VITE_SCHOOL_NAME;

	const res: ApiResult<ProcessedSchoolInfo> = await (await fetch(`/api/schoolInfo?schoolName=${schoolName}`)).json();

	if (res.success) {
		return {
			schoolInfo: res.data
		};
	} else {
		console.error(res);
		return {
			schoolInfo: null
		};
	}
};
