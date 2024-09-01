<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let adImage: string | null = null;
	let error: string | null = null;

	onMount(async () => {
		try {
			const response = await fetch(`/api/student-ad-image?_=${Date.now()}`); // 가정된 API 엔드포인트
			if (!response.ok) throw new Error('Failed to fetch ad image');
			const imageBlob = await response.blob();
			adImage = URL.createObjectURL(imageBlob);
		} catch (e) {
			console.error('Error fetching ad image:', e);
			error = '광고 이미지를 불러오는 데 실패했습니다.';
		}
	});

	onDestroy(() => {
		if (adImage) URL.revokeObjectURL(adImage);
	});
</script>

<div class="ad-container">
	{#if adImage}
		<img src={adImage} alt="학생 광고" />
	{:else if error}
		<p>{error}</p>
	{:else}
		<p>광고 이미지를 불러오는 중...</p>
	{/if}
</div>

<style>
    .ad-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
    }

    p {
        text-align: center;
        color: #666;
    }
</style>
