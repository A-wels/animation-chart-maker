<script>
	import AnimBox from './Box.svelte';
	import Line from './Line.svelte';
	import DistributionRadio from './DistributionRadio.svelte';
	import { distribution, alternate } from './stores.js';
	import { onMount } from 'svelte';
	import html2canvas from 'html2canvas';

	let boxCount = 0;
	let boxCountMax = 49;
	let positions = [0];
	let selectedDistribution = 'Equal';

	$: innerWidth = 0;
	let width = '500';

	onMount(() => {
		width = innerWidth * 0.8 * 0.5;
	});
	let dragActive = false;
	let dragTarget;
	let currentX;
	let initialX;
	let xOffset = 0;
	// get screen width and calculate percentage

	function dragStart(event) {
		if (event.target.className.includes('movable')) {
			xOffset =
				event.target.style.transform === ''
					? 0
					: event.target.style.transform.split('(')[1].split('px')[0];
			if (event.type === 'touchstart') {
				initialX = event.touches[0].clientX - xOffset;
			} else {
				initialX = event.clientX - xOffset;
			}

			if (event.target.className.startsWith('animBox')) {
				dragActive = true;
				dragTarget = event.target;
			}
		}
	}
	function dragEnd(event) {
		initialX = currentX;
		dragActive = false;
	}
	function drag(event) {
		if (dragActive) {
			event.preventDefault();

			if (event.type === 'touchmove') {
				currentX = event.touches[0].clientX - initialX;
			} else {
				currentX = event.clientX - initialX;
			}
			xOffset = currentX;
			setTranslate(currentX);
		}
	}

	function clampAndInterpolate(values, targetRange = [0, 50]) {
		const min = Math.min(...values);
		const max = Math.max(...values);

		if (min === max) {
			// Avoid division by zero
			const middle = (targetRange[0] + targetRange[1]) / 2;
			return values.map(() => middle);
		}

		const clampedValues = values.map(
			(value) => ((value - min) / (max - min)) * (targetRange[1] - targetRange[0]) + targetRange[0]
		);
		clampedValues.shift();

		return clampedValues;
	}

	function setTranslate(xPos) {
		dragTarget.style.transform = 'translate3d(' + xPos + 'px, 0, 0)';
	}

	function updatePositions() {
		positions = [];
		// reset transforms of movable boxes
		try {
			let boxes = document.querySelectorAll('.movable');
			boxes.forEach((box) => {
				box.style.transform = '';
			});
		} catch (e) {
			console.log("Couldn't reset transforms");
		}

		if (selectedDistribution === 'Equal') {
			for (let i = 1; i <= boxCount; ++i) {
				positions.push((100 / (boxCount + 1)) * i);
			}
		} else if (selectedDistribution === 'SLO-IN') {
			for (let i = 1; i < boxCount + 2; i++) {
				let pos = i ** 2;
				positions.push(pos);
			}
			positions = clampAndInterpolate(positions);
		} else if (selectedDistribution === 'SLO-OUT') {
			for (let i = 1; i < boxCount + 2; i++) {
				let pos = i ** 2;
				positions.push(pos);
			}
			positions = clampAndInterpolate(positions, [100, 50]);
			positions.reverse();
		}
	}
	distribution.subscribe((value) => {
		selectedDistribution = value;
		updatePositions();
	});

	function addBox() {
		if (boxCount < boxCountMax) {
			boxCount++;
			updatePositions();
		}
	}

	function removeBox() {
		if (boxCount > 0) {
			boxCount--;
			updatePositions();
		}
	}

	function saveChart() {
		let el = document.querySelector('#chart');
		html2canvas(el, { backgroundColor: null }).then((canvas) => {
			saveAs(canvas.toDataURL(), 'chart.png');
		});
	}

	function saveAs(uri, filename) {
		var link = document.createElement('a');

		if (typeof link.download === 'string') {
			link.href = uri;
			link.download = filename;

			//Firefox requires the link to be in the body
			document.body.appendChild(link);

			//simulate click
			link.click();

			//remove the link when done
			document.body.removeChild(link);
		} else {
			window.open(uri);
		}
	}
</script>

<svelte:window bind:innerWidth />
<div class="menubar">
	<div class="row">
		<button on:click={addBox}>Add frame</button>
		<button on:click={removeBox}>Remove frame</button>
		<label>
			<input type="checkbox" bind:checked={$alternate} />
			Alternate numbers
		</label>
		<DistributionRadio />
		<button on:click={saveChart}>Save Chart</button>
	</div>
	<div class="row">
		<label>
			<input type="range" min="100" max={innerWidth * 0.8} step="1" bind:value={width} />
			Width of Line: {width}px
		</label>
	</div>
</div>
<div id="chart">
	<div
		class="canvas"
		on:mousedown={dragStart}
		on:touchstart={dragStart}
		on:mousemove={drag}
		on:touchmove={drag}
		on:mouseup={dragEnd}
		on:touchend={dragEnd}
		style="width: {width}px"
	>
		<Line numberOfBoxes={positions.length + 2} />
		{#each Array(boxCount) as _, i}
			<AnimBox posX={positions[i]} id={i + 2} />
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
		margin: 0 auto;
		background-color: transparent;
	}

	.menubar {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.1;
	}

	button {
		margin: 0 4px;
	}

	.row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 10px;
	}

	#chart {
		background-color: transparent;
		width: fit-content;
		margin: 0 auto;
		padding: 10px;
	}
</style>
