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
		<p class="center-text text-8xl"><b>Made by 인포럼 ❤️</b></p>
		<p class="right-text"><a href="https://www.instagram.com/inforum_siji">@inforum_siji</a></p>
	</footer>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-right: 1rem;
        padding-left: 1rem;
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
        overflow-y: auto;
    }

    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px;
        background-color: white;
    }

    .center-text {
        flex: 1;
        display: flex;
        justify-content: center;
        margin-bottom: 8px;
        font-size: 28px;
    }

    .right-text {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex: 1;
        margin-right: 16px;
        font-size: 28px;
    }

    footer a {
        font-weight: bold;
    }

		footer p {
				font-size: 100px;
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