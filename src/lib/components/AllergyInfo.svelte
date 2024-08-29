<script lang="ts">
	import { onMount } from 'svelte';
	import { allergyInfoMap } from '$lib/type/allergy';

	const allergyList = Array.from(allergyInfoMap.values());
	let containerHeight: number;
	let listHeight: number;
	let scrollPosition = 0;
	let scrolling = false;
	let containerRef: HTMLElement;

	onMount(() => {
		adjustContainerHeight();
		window.addEventListener('resize', adjustContainerHeight);
		return () => {
			window.removeEventListener('resize', adjustContainerHeight);
		};
	});

	function adjustContainerHeight() {
		if (!containerRef) return;

		const mainElement = document.querySelector('main');
		if (mainElement) {
			const mainRect = mainElement.getBoundingClientRect();
			containerRef.style.height = `${mainRect.height}px`;
		}

		const list = containerRef.querySelector('.allergy-list') as HTMLElement;
		containerHeight = containerRef.clientHeight;
		listHeight = list.clientHeight;

		if (listHeight > containerHeight) {
			startScrolling();
		} else {
			stopScrolling();
		}
	}

	function startScrolling() {
		if (scrolling) return;
		scrolling = true;

		const scrollStep = () => {
			scrollPosition += 0.5;
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

<div class="allergy-info" bind:this={containerRef}>
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
        height: 100%;
        overflow: hidden;
    }

    h2 {
        font-size: clamp(24px, 5vw, 38px);
        margin-bottom: 20px;
    }

    .allergy-list-container {
        width: 100%;
        height: calc(100% - 58px); /* Subtracting title height */
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
        font-size: clamp(16px, 3vw, 24px);
        margin-bottom: 15px;
        padding: 10px;
        background-color: #f5f5f5;
        border-radius: 8px;
    }

    .allergy-icon {
        width: clamp(24px, 5vw, 30px);
        height: clamp(24px, 5vw, 30px);
        margin-right: 15px;
    }

    @media (max-width: 600px) {
        .allergy-icon {
            margin-right: 10px;
        }
    }
</style>