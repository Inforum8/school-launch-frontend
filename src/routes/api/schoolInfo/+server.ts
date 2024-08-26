import { json, type RequestEvent } from '@sveltejs/kit';
import ky from 'ky';
import type { ApiResult } from '$lib/type/result';

export async function GET(event: RequestEvent): Promise<Response> {
	try {
		const url = new URL(event.url);
		const params = url.searchParams;

		const schoolName = params.get('schoolName');

		console.log(params);

		if (!schoolName) {
			return new Response(JSON.stringify({ error: 'No school name provided.' }), {
				status: 400,
				headers: { 'content-type': 'application/json' }
			});
		}

		const schoolInfo: NiceSchoolInfo = await ky
			.get('https://open.neis.go.kr/hub/schoolInfo', {
				searchParams: {
					KEY: '', // TODO: get api key from dotenv
					Type: 'json',
					pIndex: 1,
					pSize: 100,
					SCHUL_NM: schoolName
				},
				headers: { 'content-type': 'application/json', 'Accept': '*/*' }
			})
			.json();

		if ((schoolInfo as unknown as Record<string, unknown>)['RESULT'] !== undefined) {
			const res = schoolInfo as unknown as HeadItem2;

			return json({
				success: false,
				status: parseInt(res.RESULT.CODE.split('-')[1]),
				message: res.RESULT.MESSAGE,
			} as ApiResult);
		}

		return json({
			success: true,
			status: 0,
			message: '정상 처리되었습니다.',
			data: transformSchoolInfo(schoolInfo)
		} as ApiResult<ProcessedSchoolInfo>);
	} catch (e: unknown) {
		console.error(e);
		return new Response(
			JSON.stringify(
				{
					success: false,
					status: 500,
					message: (e as Error).message,
				} as ApiResult<ProcessedSchoolInfo>
			),
			{
				status: 500,
				headers: { 'content-type': 'application/json' },
			}
		)
	}
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

interface NiceSchoolInfo {
	schoolInfo: [
		{
			head: [HeadItem1, HeadItem2];
		},
		{
			row: NiceSchool[];
		}
	];
}

interface NiceSchool {
	ATPT_OFCDC_SC_CODE: string;
	ATPT_OFCDC_SC_NM: string;
	SD_SCHUL_CODE: string;
	SCHUL_NM: string;
	ENG_SCHUL_NM: string;
	SCHUL_KND_SC_NM: string;
	LCTN_SC_NM: string;
	JU_ORG_NM: string;
	FOND_SC_NM: string;
	ORG_RDNZC: string;
	ORG_RDNMA: string;
	ORG_RDNDA: string;
	ORG_TELNO: string;
	HMPG_ADRES: string;
	COEDU_SC_NM: string;
	ORG_FAXNO: string;
	HS_SC_NM: string;
	INDST_SPECL_CCCCL_EXST_YN: 'Y' | 'N';
	HS_GNRL_BUSNS_SC_NM: string;
	SPCLY_PURPS_HS_ORD_NM: string | null;
	ENE_BFE_SEHF_SC_NM: string;
	DGHT_SC_NM: string;
	FOND_YMD: string;
	FOAS_MEMRD: string;
	LOAD_DTM: string;
}

interface ProcessedSchoolInfo {
	totalSchools: number;
	result: {
		code: string;
		message: string;
	};
	schools: ProcessedSchool[];
}

interface ProcessedSchool {
	educationOffice: {
		code: string;
		name: string;
	};
	school: {
		code: string;
		name: string;
		englishName: string;
		type: string;
	};
	location: {
		city: string;
		district: string;
		postalCode: string;
		address: string;
		detailedAddress: string;
	};
	contact: {
		phone: string;
		fax: string;
		homepage: string;
	};
	details: {
		foundationType: string;
		coeducationType: string;
		highSchoolType: string;
		industrialSpecialClassExists: boolean;
		generalOrSpecialized: string;
		specialPurposeHighSchoolType: string | null;
		admissionPhase: string;
		dayOrNight: string;
		foundationDate: string;
		anniversary: string;
	};
	lastModified: string;
}

function transformSchoolInfo(data: NiceSchoolInfo): ProcessedSchoolInfo {
	const headItem1 = data.schoolInfo[0].head[0]; // HeadItem1 타입
	const headItem2 = data.schoolInfo[0].head[1]; // HeadItem2 타입

	const { list_total_count } = headItem1;
	const { CODE, MESSAGE } = headItem2.RESULT;

	const schools: ProcessedSchool[] = data.schoolInfo[1].row.map((school) => ({
		educationOffice: {
			code: school.ATPT_OFCDC_SC_CODE,
			name: school.ATPT_OFCDC_SC_NM,
		},
		school: {
			code: school.SD_SCHUL_CODE,
			name: school.SCHUL_NM,
			englishName: school.ENG_SCHUL_NM,
			type: school.SCHUL_KND_SC_NM,
		},
		location: {
			city: school.LCTN_SC_NM,
			district: school.JU_ORG_NM,
			postalCode: school.ORG_RDNZC,
			address: school.ORG_RDNMA,
			detailedAddress: school.ORG_RDNDA,
		},
		contact: {
			phone: school.ORG_TELNO,
			fax: school.ORG_FAXNO,
			homepage: school.HMPG_ADRES,
		},
		details: {
			foundationType: school.FOND_SC_NM,
			coeducationType: school.COEDU_SC_NM,
			highSchoolType: school.HS_SC_NM,
			industrialSpecialClassExists: school.INDST_SPECL_CCCCL_EXST_YN === 'Y',
			generalOrSpecialized: school.HS_GNRL_BUSNS_SC_NM,
			specialPurposeHighSchoolType: school.SPCLY_PURPS_HS_ORD_NM || null,
			admissionPhase: school.ENE_BFE_SEHF_SC_NM,
			dayOrNight: school.DGHT_SC_NM,
			foundationDate: school.FOND_YMD,
			anniversary: school.FOAS_MEMRD,
		},
		lastModified: school.LOAD_DTM,
	}));

	return {
		totalSchools: list_total_count,
		result: {
			code: CODE,
			message: MESSAGE,
		},
		schools,
	};
}
