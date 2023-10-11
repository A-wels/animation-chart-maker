<script>
	import { distribution } from './stores.js';
	let options = ['Equal', 'SLO-IN', 'SLO-OUT'];
	export let selected = 'Equal';
	function change() {
		distribution.set(selected);
	}
</script>

<div class="distributionRadio">
	{#each options as option}
		<label>
			<input type="radio" bind:group={selected} value={option} on:change={change} />
			{option}
		</label>
	{/each}
</div>
