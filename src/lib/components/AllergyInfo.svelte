<script lang="ts">
	import { onMount } from 'svelte';
	import { allergyInfoMap } from '$lib/type/allergy';

	const allergyList = Array.from(allergyInfoMap.values());
	let containerHeight: number;
	let listHeight: number;
	let scrollPosition = 0;
	let scrolling = false;

	onMount(() => {
		const container = document.querySelector('.allergy-list-container') as HTMLElement;
		const list = document.querySelector('.allergy-list') as HTMLElement;
		containerHeight = container.clientHeight;
		listHeight = list.clientHeight;

		if (listHeight > containerHeight) {
			startScrolling();
		}
	});

	function startScrolling() {
		if (scrolling) return;
		scrolling = true;

		const scrollStep = () => {
			scrollPosition += 0.5;  // 스크롤 속도를 조절할 수 있습니다
			if (scrollPosition >= listHeight) {
				scrollPosition = -containerHeight;
			}
			if (scrolling) {
				requestAnimationFrame(scrollStep);
			}
		};
		requestAnimationFrame(scrollStep);
	}

	function stopScrolling() {
		scrolling = false;
	}
</script>

<div class="allergy-info">
	<h2>알레르기 정보</h2>
	<div class="allergy-list-container"
			 on:mouseenter={stopScrolling}
			 on:mouseleave={startScrolling}>
		<ul class="allergy-list" style="transform: translateY({-scrollPosition}px)">
			{#each allergyList as allergy}
				<li>
					<img
						src={allergy.icon}
						alt={allergy.name}
						class="allergy-icon"
					/>
					<span>{allergy.id} - {allergy.name}</span>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
    .allergy-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 400px;
        margin: 0;
				height: 65lvh;
    }

    h2 {
        font-size: 38px;
        margin-bottom: 20px;
    }

    .allergy-list-container {
        width: 100%;
        height: calc(100% - 58px); /* 제목 높이를 뺀 나머지 */
        overflow: hidden;
    }

    .allergy-list {
        list-style-type: none;
        padding: 0;
        width: 100%;
        transition: transform 0.5s linear;
    }

    li {
        display: flex;
        align-items: center;
        font-size: 24px;
        margin-bottom: 15px;
        padding: 10px;
        background-color: #f5f5f5;
        border-radius: 8px;
    }

    .allergy-icon {
        width: 30px;
        height: 30px;
        margin-right: 15px;
    }

    @media (max-width: 600px) {
        li {
            font-size: 20px;
        }

        .allergy-icon {
            width: 24px;
            height: 24px;
            margin-right: 10px;
        }
    }
</style>