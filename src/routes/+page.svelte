<script lang="ts">
	import MealInfo from '$lib/components/MealInfo.svelte';
	import AllergyInfo from '$lib/components/AllergyInfo.svelte';
	import StudentAds from '$lib/components/StudentAds.svelte';
	import type { ProcessedSchoolInfo } from '$lib/type/school';
	import type { ProcessedMealServiceDietInfo } from '$lib/type/meal';
	import { onMount } from 'svelte';
	import type { ApiResult } from '$lib/type/result';

	export let data: { schoolInfo: ProcessedSchoolInfo | null };
	let schoolInfo = data.schoolInfo;
	let errorMessage: string | null = null;
	let multipleSchoolsDetected = false;

	let mealInfo: ApiResult<ProcessedMealServiceDietInfo> | null = null;

	if (schoolInfo) {
		multipleSchoolsDetected = schoolInfo.totalSchools > 1;

		if (!multipleSchoolsDetected) {
			// 급해서 이렇게 만들었지만, 나중에 더 좋은 처리방식으로 갈아타야함
			onMount(async () => {
				mealInfo = await (await fetch(`/api/mealInfo?schoolCode=${schoolInfo.schools[0].school.code}&educationOfficeCode=${schoolInfo.schools[0].educationOffice.code}`)).json();

				if (!mealInfo?.success) {
					errorMessage = '급식정보를 불러오는데에 실패하였습니다.';
				} else if (mealInfo.data.meals.length > 1) {
					errorMessage = '급식정보가 너무 많습니다.'
				} else if (mealInfo.data.meals.length === 0) {
					errorMessage = '오늘은 급식이 존재하지 않습니다!'
				}
			});
		}
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="page">
	{#if errorMessage}
		<div class="error">{errorMessage}</div>
	{:else if multipleSchoolsDetected}
		<div class="warning">
			<p>Multiple schools detected. Please refine your search.</p>
		</div>
	{:else if !schoolInfo}
		<div class="not-found">School not found.</div>
	{:else if !mealInfo}
		<div class="not-found">급식 정보가 존재하지 않습니다!</div>
	{:else}
		<div class="content">
			<div class="section side-section">
				<AllergyInfo />
			</div>

			<div class="divider vertical"></div>

			<div class="section main-section">
				<MealInfo menu={mealInfo.data.meals[0].menu} />
			</div>

			<div class="divider vertical"></div>

			<div class="section side-section">
				<StudentAds />
			</div>
		</div>
	{/if}
</section>

<style>
    :global(body, html) {
        height: 100vh;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    .page {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .content {
        display: flex;
        flex: 1;
        width: 100%;
        overflow: hidden;
    }

    .section {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: auto;
        padding: 1rem;
        box-sizing: border-box;
    }

    .side-section {
        flex: 1;
        max-width: 20%;
    }

    .main-section {
        flex: 3;
        max-width: 60%;
    }

    .divider {
        border: 0;
        background: #ccc;
    }

    .divider.vertical {
        width: 1px;
        height: auto;
        margin: 0 0.5rem;
    }

    .error, .not-found, .warning {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        color: #f00;
        font-size: 1.25rem;
        text-align: center;
    }

    .warning {
        color: #f80;
    }
</style>