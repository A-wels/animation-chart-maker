<script>
	//https://svelte.dev/repl/75d34e46cbe64bb68b7c2ac2c61931ce?version=4.2.1
	import { alternate } from '$lib/stores.js';
	export let posX = 0;
	export let display_id = -1;
	export let id = -1;

	let movable = posX === 0 || posX === 100 ? false : true;
	// get total width of canvas and calculate percentage
	let offsetX = 0; // posX === 100 ? '-5px' : '0px';
	let isBreakdown = false;
	function toggleBreakdown(event) {
		console.log('toggleBreakdown');
		event.preventDefault();
		isBreakdown = !isBreakdown;
	}
</script>

<div
	class="outer-container {movable ? 'movable' : 'fixed'} "
	style="left: {posX}%; transform: translate3d({offsetX}, 0px, 0px);"
	on:contextmenu={toggleBreakdown}
>
	<div class="animBox {movable ? 'movable' : 'fixed'}" />
	<div
		class="centered-text {movable ? '' : 'circle'}"
		style="top: {$alternate && id % 2 != 0 ? 44 : -44}px; "
	>
		<p style={isBreakdown && movable ? 'border-bottom: 2px solid #000;' : ''}>{display_id}</p>
	</div>
</div>

<style>
	p {
		font-size: 14px;
		font-weight: bold;
		line-height: 1;
	}
	.animBox {
		width: 5px;
		height: 50px;
		position: absolute;
		background-color: var(--backgroundcolor, #000000);
		border: '1px solid ' + --var(bordercolor, #000000);
	}
	.centered-text {
		position: absolute;
		display: flex;
		align-items: center; /* Vertically center the text */
		justify-content: center; /* Horizontally center the text */
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.circle {
		position: absolute;
		top: -34px !important;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		color: #000;
		text-align: center;
		background: transparent;
		border: 1px solid #000;
	}
	.outer-container {
		position: absolute;
		height: 50px;
		width: 5px;
		display: flex;
		text-align: center;
		justify-content: center;
	}
</style>
