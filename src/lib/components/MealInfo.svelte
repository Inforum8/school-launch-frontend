<script lang="ts">
	export let menu: string;

	const menuArray: string[] = menu.split('<br/>');
</script>

<div>
	<h2>급식 정보</h2>
	<ul>
		{#each menuArray as item}
			<li>{item}</li>
		{/each}
	</ul>
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