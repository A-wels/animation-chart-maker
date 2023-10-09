<script>
	import Canvas from './Canvas.svelte';
</script>

<svelte:head>
	<title>Animation Chart Maker</title>
	<meta name="description" content="Animation Chart Maker" />
</svelte:head>

<section>
	<h1>Animation Chart Maker</h1>
</section>
<Canvas />

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.1;
	}

	h1 {
		width: 100%;
	}
</style>
