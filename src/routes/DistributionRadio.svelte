<script>
	import { distribution } from './stores.js';
	let options = ['Equal', 'SLO-IN', 'SLO-OUT', 'SLO-IN + SLO-OUT'];
	export let selected = 'Equal';
	function change() {
		distribution.set(selected);
	}
</script>

<div class="distributionRadio">
	{#each options as option}
		<div class="distributionOption">
			<label>
				<input type="radio" bind:group={selected} value={option} on:change={change} />
				{option}
			</label>
		</div>
	{/each}
</div>

<style>
	.distributionRadio {
		display: flex;
		flex-wrap: wrap;
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
