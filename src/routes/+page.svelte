<script>
import MealInfo from '$lib/components/MealInfo.svelte';
import AllergyInfo from '$lib/components/AllergyInfo.svelte';
import StudentAds from '$lib/components/StudentAds.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="page">
	<div class="content">
		<div class="section">
			<MealInfo />
		</div>

		<div class="divider vertical"></div>

		<div class="section">
			<AllergyInfo />
		</div>

		<div class="divider vertical"></div>

		<div class="section">
			<StudentAds />
		</div>
	</div>

</section>

<style>
    .page {
        width: 100%;
        height: 100%;
        flex: 1;
        display: flex;
				flex-direction: column;
    }

    .content {
        display: flex;
        flex: 1;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }

    .section:nth-child(1) {
        flex: 2;
    }

    .section:nth-child(2),
    .section:nth-child(3) {
        flex: 1;
    }

    .section {
				flex: 1;
				display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        padding: 1rem;
    }

    .divider {
        border: 0;
        margin: 1rem 0;
        background: #ccc;
    }

    .divider.vertical {
        width: 1px;
        height: auto;
        margin: 0 1rem;
    }
</style>
