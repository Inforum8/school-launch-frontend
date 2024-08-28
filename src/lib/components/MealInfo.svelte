<script lang="ts">
	import { type MealInfo, parseMealAllergies } from '$lib/type/allergy';

	export let menu: string;

	const menuArray: MealInfo[] = parseMealAllergies(menu.split('<br/>'));
</script>

<div class="meal-info">
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
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
    }

    h2 {
        font-size: 38px;
        margin-bottom: 20px;
    }

    ul {
        list-style-type: none;
        padding: 0;
        width: 100%;
    }

    li {
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        padding: 20px;
        background-color: #f5f5f5;
        border-radius: 8px;
    }

    .meal-name {
        flex: 1;
        margin-right: 10px;
    }

    .allergy-icons {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .allergy-icon {
        width: 24px;
        height: 24px;
        margin-left: 5px;
    }

    @media (max-width: 600px) {
        li {
            flex-direction: column;
            align-items: flex-start;
        }

        .meal-name {
            margin-bottom: 5px;
        }

        .allergy-icons {
            margin-top: 5px;
        }
    }
</style>