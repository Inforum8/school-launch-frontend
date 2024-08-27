<script lang="ts">
	import { type MealInfo, parseMealAllergies } from '$lib/type/allergy';

	export let menu: string;

	const menuArray: MealInfo[] = parseMealAllergies(menu.split('<br/>'));
</script>

<div>
	<h2>급식 정보</h2>
	<ul>
		{#each menuArray as item}
			<li>{item.name}</li>
		{/each}
	</ul>
<!-- TODO: 아이콘 넣어야함 (알러지)	-->
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
				justify-content: center;
    }

    h2 {
        font-size: 38px;
    }

    p {
        font-size: 30px;
    }

		li {
				font-size: 30px;
		}
</style>