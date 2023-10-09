<script>
	//https://svelte.dev/repl/75d34e46cbe64bb68b7c2ac2c61931ce?version=4.2.1
	import { alternate } from './stores.js';
	export let posX = 0;
	export let id = 10;
	let movable = posX === 0 || posX === 100 ? false : true;
	// get total width of canvas and calculate percentage
	let offsetX = posX === 100 ? '-5px' : '0px';
	console.log(posX);
</script>

<div
	style="transform: translate3d({offsetX}, 0px, 0px);"
	style:left="{posX}%"
	class="animBox {movable ? 'movable' : 'fixed'}"
>
	<div class="text" style="top: {$alternate && id % 2 === 0 ? 50 : -15}px">{id}</div>
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
		position: absolute;
		left: 0;
		font-size: 14px;
		font-weight: bold;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
