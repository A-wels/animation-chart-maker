<script>
	import DistributionRadio from './DistributionRadio.svelte';
	import {
		alternate,
		boxCount,
		positions as positionsStore,
		distribution,
		width
	} from './stores.js';
	import { saveChart } from './Canvas.js';
	import { DistributionOptions } from './DistributionRadio.js';
	import { equalDistribution, slowInDist, slowOutDist, slowInOutDist } from '$lib/Distributions.js';

	export let innerWidth = 500;
	let selectedDistribution = DistributionOptions.Equal;

	boxCount.subscribe((value) => {
		updatePositions();
	});

	function addBox() {
		boxCount.update((n) => n + 1);
	}

	function removeBox() {
		if ($boxCount > 2) {
			boxCount.update((n) => n - 1);
		}
	}

	function updatePositions() {
		let positions = [];
		// reset transforms of movable boxes
		try {
			let boxes = document.querySelectorAll('.movable');
			console.log(boxes);
			boxes.forEach((box) => {
				box.style.transform = '';
			});
		} catch (e) {
			console.log("Couldn't reset transforms");
		}

		switch (selectedDistribution) {
			case DistributionOptions.Equal:
				positions = equalDistribution($boxCount);
				break;
			case DistributionOptions.SlowIn:
				positions = slowInDist($boxCount);
				break;
			case DistributionOptions.SlowOut:
				positions = slowOutDist($boxCount);
				break;
			case DistributionOptions.SlowInOut:
				positions = slowInOutDist($boxCount);
				break;
		}
		positionsStore.set(positions);
	}
	distribution.subscribe((value) => {
		selectedDistribution = value;
		updatePositions();
	});
</script>

<div class="menubar">
	<div class="row">
		<div>
			<button on:click={addBox}>Add frame</button>
			<button on:click={removeBox}>Remove frame</button>
			<button on:click={() => boxCount.set(2)}>Reset</button>
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
				<input type="range" min="100" max={innerWidth * 0.8} step="1" bind:value={$width} />
				<div>
					Width of Line: {$width}px
				</div>
			</label>
		</div>
	</div>
</div>

<style>
	.menubar {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.1;
	}

	.row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 10px;
	}
	button {
		margin: 4px;
		border-radius: 8px;
		padding: 4px;
		background-color: #ff3e00;
	}
</style>
