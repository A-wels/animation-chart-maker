<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p style="text-align: center">
			Feature requests and bug reports are appreciated! <br />
			Please use the
			<a href="https://github.com/A-wels/animation-chart-maker/issues"> issue tracker</a> or
			<a href="mailto:chartmaker@a-wels.de">Email me</a>
		</p>
		<p>Made by <a href="https://a-wels.de">Alexander Welsing</a></p>
		<p style="font-size: small">
			<a href="/impressum"> Impressum</a> and <a href="/privacy"> Privacy policy</a>
		</p>
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

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
