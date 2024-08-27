export interface ProcessedSchoolInfo {
	totalSchools: number;
	result: {
		code: string;
		message: string;
	};
	schools: ProcessedSchool[];
}

export interface ProcessedSchool {
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