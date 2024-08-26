<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<div class="app">
	<Header />

	<hr class="divider" />

	<main>
		<slot />
	</main>

	<hr class="divider" />

	<footer>
		<p class="center-text"><b>Made by 나이준 ❤️</b></p>
		<p class="right-text"><a href="https://www.instagram.com/sjhs.official">@sjhs.official</a> X <a href="https://www.instagram.com/inforum_siji">@inforum_siji</a></p>
	</footer>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
    }

    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px;
    }

    .center-text {
        flex: 1;
        display: flex;
        justify-content: center;
        margin-bottom: 8px;
    }

    .right-text {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex: 1;
        margin-right: 16px;
    }

    footer a {
        font-weight: bold;
    }

    @media (min-width: 480px) {
        footer {
            padding: 12px 0;
        }
    }

    .divider {
        border: 0;
        height: 1px;
        margin: 1rem 0;
        background: #ccc;
        width: 100%;
    }
</style>