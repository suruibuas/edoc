<script>
	import PerfectScrollbar from 'perfect-scrollbar';
	import '@/style/common/scroll.less';
	import { onMount, afterUpdate, onDestroy } from 'svelte';

	export let height = window.innerHeight;

	let dom;
	let obj;

	$: style = `height:${height}px;`;

	onMount(() => {
		obj = new PerfectScrollbar(dom, {
			suppressScrollX: true,
		});
	});

	afterUpdate(() => {
		obj.update();
	});

	onDestroy(() => {
		obj.destroy();
		obj = null;
	});
</script>

<div bind:this={dom} {style}>
	<slot {obj} {dom} />
</div>

<style lang="less">
	div {
		position: relative;
	}
</style>
