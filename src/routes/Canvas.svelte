<script>
	import AnimBox from './Box.svelte';
	import Line from './Line.svelte';
	import DistributionRadio from './DistributionRadio.svelte';
	import { distribution, alternate } from './stores.js';
	import { onMount } from 'svelte';
	import html2canvas from 'html2canvas';

	let boxCount = 2;
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

	function setTranslate(xPos) {
		dragTarget.style.transform = 'translate3d(' + xPos + 'px, 0, 0)';
	}

	function equalDistribution() {
		// calculate positions: boxCount boxes with equal distance on positions 0-100. Boxcount includes start and end. If boxCount = 2 -> only start and end box
		let pos = [];
		let step = 100 / (boxCount - 1);
		for (let i = 0; i < boxCount; i++) {
			pos.push(step * i);
		}
		// remove first and last element -> always on the line
		pos.shift();
		pos.pop();
		return pos;
	}
	function sloInDistribution() {
		let posList = [50];

		for (let i = 1; i < boxCount - 2; i++) {
			posList.unshift(posList[0] / 2);
		}
		return posList;
	}

	function sloOutDistribution() {
		let posList = [50];
		for (let i = 1; i < boxCount - 2; i++) {
			posList.push(50 + posList[posList.length - 1] / 2);
		}
		return posList;
	}

	function sloInSloOutDistribution() {
		let pos = [50];
		for (let i = 0; i < boxCount - 3; i++) {
			if (i % 2 === 0) {
				pos.unshift(pos[0] / 2);
			} else {
				pos.push(50 + pos[pos.length - 1] / 2);
			}
		}
		console.log(pos);
		return pos;
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
			positions = equalDistribution();
		} else if (selectedDistribution === 'SLO-IN') {
			positions = sloInDistribution();
		} else if (selectedDistribution === 'SLO-OUT') {
			positions = sloOutDistribution();
		} else if (selectedDistribution === 'SLO-IN + SLO-OUT') {
			positions = sloInSloOutDistribution();
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
		if (boxCount > 2) {
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
		<div>
			<button on:click={addBox}>Add frame</button>
			<button on:click={removeBox}>Remove frame</button>
			<button on:click={() => (boxCount = 2)}>Reset</button>
			<button on:click={saveChart}>Save Chart</button>
		</div>
	</div>
	<div class="row">
		<DistributionRadio />
		<label id="alternatecheck">
			<input type="checkbox" bind:checked={$alternate} />
			Alternate numbers
		</label>
	</div>
	<div class="row">
		<div style="text-align: center;">
			<label>
				<input type="range" min="100" max={innerWidth * 0.8} step="1" bind:value={width} />
				<div>
					Width of Line: {Math.round(width)}px
				</div>
			</label>
		</div>
	</div>
</div>
<div id="chart">
	<div
		class="canvas"
		oncontextmenu="return false;"
		on:mousedown={dragStart}
		on:touchstart={dragStart}
		on:mousemove={drag}
		on:touchmove={drag}
		on:mouseup={dragEnd}
		on:touchend={dragEnd}
		style="width: {width}px"
	>
		<Line numberOfBoxes={boxCount} />
		{#each Array(boxCount - 2) as _, i}
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
	button {
		margin: 4px;
		border-radius: 8px;
		padding: 4px;
		background-color: #ff3e00;
	}
	#alternatecheck {
		margin-left: 10px;
	}
</style>
