<script>
	//https://svelte.dev/repl/75d34e46cbe64bb68b7c2ac2c61931ce?version=4.2.1
	import { alternate } from '$lib/stores.js';
	export let posX = 0;
	export let id = -1;
	let movable = posX === 0 || posX === 100 ? false : true;
	// get total width of canvas and calculate percentage
	let offsetX = 0; // posX === 100 ? '-5px' : '0px';
	let isBreakdown = false;
	function toggleBreakdown(event) {
		event.preventDefault();
		isBreakdown = !isBreakdown;
	}
</script>

<div
	style="transform: translate3d({offsetX}, 0px, 0px);"
	style:left="{posX}%"
	class="animBox {movable ? 'movable' : 'fixed'}"
	on:contextmenu={toggleBreakdown}
>
	<div
		class="text {movable ? '' : 'circle'}"
		style="top: {$alternate && id % 2 === 0 ? 54 : -24}px; {isBreakdown && movable
			? 'border-bottom: 2px solid #000;'
			: ''}"
	>
		{id}
	</div>
</div>

<style>
	.animBox {
		width: 5px;
		height: 50px;
		position: absolute;
		background-color: var(--backgroundcolor, #000000);
		border: '1px solid ' + --var(bordercolor, #000000);
	}
	.text {
		position: relative;
		left: -5px;
		width: 15px;
		height: 16px;
		font-size: 14px;
		font-weight: bold;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		text-align: center;
	}
	.circle {
		left: -7px;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		color: #000;
		text-align: center;
		background: transparent;
		border: 1px solid #000;
	}
</style>
