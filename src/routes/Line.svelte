<script>
	import AnimBox from './Box.svelte';
	import { boxCount, startIndex, frameIndexes } from '$lib/stores.js';
	import { getFrameIndex } from '$lib/Distributions.js';
</script>

<div class="line" />
<AnimBox posX={0} id={$startIndex} />
<AnimBox posX={100} id={getFrameIndex($boxCount + $startIndex - 1, $frameIndexes)} />

<style>
	.line {
		width: 100%;
		height: 2px;
		background-color: var(--backgroundcolor, #000000);
		border: '1px solid ' + --var(bordercolor, #000000);
	}
</style>
