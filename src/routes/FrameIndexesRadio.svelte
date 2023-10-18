<script>
	import { frameIndexesOption } from '$lib/Distributions.js';
	import { frameIndexes } from '$lib/stores.js';
	let selected = 'Ones';
	function change() {
		frameIndexes.set(selected);
	}
</script>

<div class="distributionRadio">
	<div>Frames on:</div>
	{#each Object.entries(frameIndexesOption) as option}
		<div class="distributionOption">
			<label>
				<input type="radio" bind:group={selected} value={option[1]} on:change={change} />
				{option[1]}
			</label>
		</div>
	{/each}
</div>

<style>
	.distributionRadio {
		display: flex;
		flex-wrap: wrap;
		margin-top: 10px;
	}

	.distributionOption {
		display: flex;
		align-items: center;
	}

	.distributionOption label {
		margin-left: 0.5em;
		line-height: 2.5vh;
	}
</style>
