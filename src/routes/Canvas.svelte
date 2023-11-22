<script>
	import AnimBox from './Box.svelte';
	import Line from './Line.svelte';
	import { width, positions, boxCount, startIndex, frameIndexes, rotate } from '$lib/stores.js';
	import { onMount } from 'svelte';
	import Menubar from './Menubar.svelte';
	import { getFrameIndex } from '$lib/Distributions.js';

	$: innerWidth = 0;
	startIndex.subscribe((value) => {
		if (value === null || value < 0) {
			startIndex.set(0);
		}
	});

	onMount(() => {
		width.set(Math.round(innerWidth * 0.8 * 0.5).toString());
	});
	let dragActive = false;
	let dragTarget;
	let currentX;
	let initialX;
	let currentY;
	let initialY;
	let yOffset = 0;
	let xOffset = 0;
	// get screen width and calculate percentage

	function dragStart(event) {
		if (event.target.parentNode.className.includes('movable')) {
			xOffset =
				event.target.parentNode.style.transform === ''
					? 0
					: event.target.parentNode.style.transform.split('(')[1].split('px')[0];

			yOffset =
				event.target.parentNode.style.transform === ''
					? 0
					: event.target.parentNode.style.transform.split('(')[1].split('px')[0];
			if (event.type === 'touchstart') {
				initialY = event.touches[0].clientY - yOffset;
				initialX = event.touches[0].clientX - xOffset;
			} else {
				initialX = event.clientX - xOffset;
				initialY = event.clientY - yOffset;
			}

			if (event.target.className.startsWith('animBox')) {
				dragActive = true;
				dragTarget = event.target;
			}
		}
	}
	function dragEnd(event) {
		initialX = currentX;
		initialY = currentY;
		dragActive = false;
	}
	function drag(event) {
		if (dragActive) {
			event.preventDefault();

			if (event.type === 'touchmove') {
				currentX = event.touches[0].clientX - initialX;
				currentY = event.touches[0].clientY - initialY;
			} else {
				currentX = event.clientX - initialX;
				currentY = event.clientY - initialY;
			}
			xOffset = Math.max(-parseFloat($width) / 2, Math.min(currentX, parseFloat($width) / 2));
			yOffset = Math.max(-parseFloat($width) / 2, Math.min(currentY, parseFloat($width) / 2));
			if ($rotate) {
				setTranslate(yOffset);
			} else {
				setTranslate(xOffset);
			}
		}
	}

	function setTranslate(xPos) {
		dragTarget.offsetParent.style.transform = 'translate3d(' + xPos + 'px, 0, 0)';
	}
</script>

<svelte:window bind:innerWidth />
<Menubar {innerWidth} />
<div id="chart">
	<div
		role="figure"
		class="canvas {$rotate ? 'rotated' : ''}"
		oncontextmenu="return false;"
		on:mousedown={dragStart}
		on:touchstart={dragStart}
		on:mousemove={drag}
		on:touchmove={drag}
		on:mouseup={dragEnd}
		on:touchend={dragEnd}
		style="width: {$width}px; margin: {$rotate ? $width / 2 : 0}px 0px;"
	>
		<Line />
		{#each Array($boxCount - 2) as _, i}
			<AnimBox
				posX={$positions[i]}
				display_id={getFrameIndex(i + 1 + $startIndex, $frameIndexes)}
				id={i + 1}
			/>
		{/each}
	</div>
</div>

<style>
	.canvas {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 150px;
		background-color: transparent;
	}

	#chart {
		background-color: transparent;
		width: fit-content;
		margin: 0 auto;
		padding: 10px 20px;
		height: fit-content;
	}

	.rotated {
		transform: rotate(90deg);
		white-space: nowrap;
		overflow: visible;
	}
</style>
