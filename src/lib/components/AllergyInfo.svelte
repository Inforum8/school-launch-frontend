<script lang="ts">
	import { onMount } from 'svelte';
	import { allergyInfoMap } from '$lib/type/allergy';

	const allergyList = Array.from(allergyInfoMap.values());
	let containerHeight: number;
	let listHeight: number;
	let scrollPosition = 0;

	onMount(() => {
		const container = document.querySelector('.allergy-info') as HTMLElement;
		const list = document.querySelector('.allergy-list') as HTMLElement;
		containerHeight = container.clientHeight;
		listHeight = list.clientHeight;

		if (listHeight > containerHeight) {
			startScrolling();
		}
	});

	function startScrolling() {
		const scrollStep = () => {
			scrollPosition += 1;
			if (scrollPosition >= listHeight) {
				scrollPosition = -containerHeight;
			}
			requestAnimationFrame(scrollStep);
		};
		requestAnimationFrame(scrollStep);
	}
</script>

<div class="allergy-info">
	<h2>알레르기 정보</h2>
	<div class="allergy-list-container">
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
        max-width: 600px;
        margin: 0;
        height: 65vh; /* TV 화면에 맞게 조정 */
        overflow: hidden;
    }

    h2 {
        font-size: 38px;
        margin-bottom: 20px;
    }

    .allergy-list-container {
        width: 100%;
        overflow: hidden;
        flex-grow: 1;
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