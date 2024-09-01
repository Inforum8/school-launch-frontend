<script lang="ts">
	import MealInfo from '$lib/components/MealInfo.svelte';
	import AllergyInfo from '$lib/components/AllergyInfo.svelte';
	import StudentAds from '$lib/components/StudentAds.svelte';
	import type { ProcessedSchoolInfo } from '$lib/type/school';
	import type { ProcessedMealServiceDietInfo } from '$lib/type/meal';
	import { writable } from 'svelte/store';

	export let data: {
		schoolInfo: ProcessedSchoolInfo | null;
		mealInfo: ProcessedMealServiceDietInfo | null;
	};

	const schoolInfo = writable(data.schoolInfo);
	const mealInfo = writable(data.mealInfo);
	let errorMessage: string | null = null;

	$: multipleSchoolsDetected = $schoolInfo ? $schoolInfo.totalSchools > 1 : false;

	$: if ($mealInfo) {
		if ($mealInfo.meals.length > 1) {
			errorMessage = '급식정보가 너무 많습니다.';
		} else if ($mealInfo.meals.length === 0) {
			errorMessage = '오늘은 급식이 존재하지 않습니다!';
		} else {
			errorMessage = null;
		}
	} else {
		errorMessage = null;
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
	{:else if !$schoolInfo}
		<div class="not-found">School not found.</div>
	{:else if !$mealInfo}
		<div class="not-found">급식 정보가 존재하지 않습니다!</div>
	{:else}
		<div class="content">
			<div class="section side-section">
				<AllergyInfo />
			</div>

			<div class="divider vertical"></div>

			<div class="section main-section">
				<MealInfo menu={$mealInfo.meals[0].menu} />
			</div>

			<div class="divider vertical"></div>

			<div class="section side-section">
				<StudentAds />
			</div>
		</div>
	{/if}
</section>

<style>
    .page {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .content {
        display: flex;
        flex: 1;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .section {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: auto;
        padding: 0.5rem;
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

    .divider.vertical {
        width: 1px;
        height: auto;
        margin: 0 0.25rem;
        background: #ccc;
    }

    .error, .not-found, .warning {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        color: #f00;
        font-size: clamp(16px, 2.5vw, 24px);
        text-align: center;
    }

    .warning {
        color: #f80;
    }
</style>