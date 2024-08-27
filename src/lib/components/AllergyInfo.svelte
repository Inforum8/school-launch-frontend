<script lang="ts">
	import { allergyInfoMap } from '$lib/type/allergy';

	const allergyList = Array.from(allergyInfoMap.values());
</script>

<div class="allergy-info">
	<h2>알레르기 정보</h2>
	<ul>
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

<style>
    .allergy-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 600px;
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