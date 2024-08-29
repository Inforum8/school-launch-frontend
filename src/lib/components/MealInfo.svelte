<script lang="ts">
	import { type MealInfo, parseMealAllergies } from '$lib/type/allergy';
	import { onMount } from 'svelte';

	export let menu: string;

	const menuArray: MealInfo[] = parseMealAllergies(menu.split('<br/>'));
	let containerRef: HTMLElement;

	onMount(() => {
		adjustFontSize();
		window.addEventListener('resize', adjustFontSize);
		return () => {
			window.removeEventListener('resize', adjustFontSize);
		};
	});

	function adjustFontSize() {
		if (!containerRef) return;
		const containerHeight = containerRef.clientHeight;
		const itemCount = menuArray.length;
		const baseSize = Math.min(containerHeight / (itemCount * 2.5), 24);
		containerRef.style.setProperty('--base-font-size', `${baseSize}px`);
	}
</script>

<div class="meal-info" bind:this={containerRef}>
	<h2>급식 정보</h2>
	<ul>
		{#each menuArray as item}
			<li>
				<span class="meal-name">{item.name}</span>
				<div class="allergy-icons">
					{#each item.allergies as allergy}
						<img
							src={allergy.icon}
							alt={allergy.name}
							title={allergy.name}
							class="allergy-icon"
						/>
					{/each}
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
    .meal-info {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: hidden;
        --base-font-size: 16px;
    }

    h2 {
        font-size: calc(var(--base-font-size) * 1.5);
        margin-bottom: 1rem;
        text-align: center;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: calc(100% - 3rem); /* Subtracting approximate header height */
    }

    li {
        font-size: var(--base-font-size);
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #f5f5f5;
        border-radius: 8px;
        padding: 0.5rem;
        margin-bottom: 0.5rem;
    }

    li:last-child {
        margin-bottom: 0;
    }

    .meal-name {
        flex: 1;
        margin-right: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .allergy-icons {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
    }

    .allergy-icon {
        width: calc(var(--base-font-size) * 1.2);
        height: calc(var(--base-font-size) * 1.2);
        margin-left: 5px;
    }

    @media (max-width: 600px) {
        .allergy-icons {
            max-width: 40%;
            overflow-x: auto;
        }
    }
</style>