<script>
	import AnimBox from './Box.svelte';
	import { boxCount } from './stores.js';
</script>

<div class="line" />
<AnimBox posX={0} id={1} />
<AnimBox posX={100} id={$boxCount} />

<style>
	.line {
		width: 100%;
		height: 2px;
		background-color: var(--backgroundcolor, #000000);
		border: '1px solid ' + --var(bordercolor, #000000);
	}
</style>
