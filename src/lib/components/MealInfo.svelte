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
		const containerWidth = containerRef.clientWidth;
		const itemCount = menuArray.length;

		// Calculate the ideal item height
		const idealItemHeight = containerHeight / itemCount;

		// Calculate the maximum width for the meal name (70% of container width)
		const maxNameWidth = containerWidth * 0.7;

		// Calculate the base font size (capped at 24px)
		const baseFontSize = Math.min(idealItemHeight / 3, 24);

		containerRef.style.setProperty('--base-font-size', `${baseFontSize}px`);
		containerRef.style.setProperty('--item-height', `${idealItemHeight}px`);
		containerRef.style.setProperty('--max-name-width', `${maxNameWidth}px`);
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
        --item-height: 50px;
        --max-name-width: 70%;
    }

    h2 {
        font-size: calc(var(--base-font-size) * 1.5);
        margin-bottom: 0.5rem;
        text-align: center;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    li {
        font-size: var(--base-font-size);
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #f5f5f5;
        border-radius: 8px;
        padding: 0.25rem 0.5rem;
        margin-bottom: 1.0rem;
				/* 아 몰라... 어케든 되겠지... */
        height: calc(var(--base-font-size) * 4);
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
        max-width: var(--max-name-width);
    }

    .allergy-icons {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        overflow-x: auto;
        max-width: 30%;
    }

    .allergy-icon {
        width: calc(var(--base-font-size) * 1.2);
        height: calc(var(--base-font-size) * 1.2);
        margin-left: 5px;
        flex-shrink: 0;
    }

    @media (max-width: 600px) {
        .allergy-icons {
            max-width: 40%;
        }
    }
</style>