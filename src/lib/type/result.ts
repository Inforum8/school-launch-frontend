export interface ApiResult<T = void> {
	success: boolean;
	status: number;
	message: string;
	data: T;
}