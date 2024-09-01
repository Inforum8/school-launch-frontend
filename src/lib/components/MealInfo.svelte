<script lang="ts">
	import { type MealInfo, parseMealAllergies } from '$lib/type/allergy';
	import { onMount } from 'svelte';

	export let menu: string;

	const menuArray: MealInfo[] = parseMealAllergies(menu.split('<br/>'));
	let containerRef: HTMLElement;

	onMount(() => {
		adjustLayout();
		window.addEventListener('resize', adjustLayout);
		return () => {
			window.removeEventListener('resize', adjustLayout);
		};
	});

	function adjustLayout() {
		if (!containerRef) return;
		const containerHeight = containerRef.clientHeight;
		const itemCount = menuArray.length;

		const idealItemHeight = containerHeight / itemCount;

		const minItemHeight = 50;
		const itemHeight = Math.max(idealItemHeight, minItemHeight);

		const baseFontSize = Math.min(Math.max(itemHeight / 2.2, 16), 30);

		containerRef.style.setProperty('--item-height', `${itemHeight}px`);
		containerRef.style.setProperty('--base-font-size', `${baseFontSize}px`);
	}
</script>

<div class="meal-info" bind:this={containerRef}>
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
        width: 100%;
        height: 100%;
        overflow: hidden;
        --base-font-size: 16px;
        --item-height: 60px;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    li {
        font-size: var(--base-font-size);
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #f5f5f5;
        border-radius: 6px;
        padding: 6px 10px;
        margin-bottom: 6px;
        height: var(--item-height);
        box-sizing: border-box;
    }

    li:last-child {
        margin-bottom: 0;
    }

    .meal-name {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 10px;
    }

    .allergy-icons {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        overflow-x: hidden;
    }

    .allergy-icon {
        width: calc(var(--base-font-size) * 1.6);
        height: calc(var(--base-font-size) * 1.6);
        margin-left: 4px;
        flex-shrink: 0;
    }
</style>