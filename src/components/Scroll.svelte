<script>
	import _ from 'lodash';
	import PerfectScrollbar from 'perfect-scrollbar';
	import '@/style/common/scroll.less';
	import {
		onMount,
		afterUpdate,
		onDestroy,
		createEventDispatcher,
	} from 'svelte';

	const dispatch = createEventDispatcher();

	export let height = window.innerHeight;
	export let listen = false;

	let dom;
	let obj;

	$: style = `height:${height}px;`;

	onMount(() => {
		obj = new PerfectScrollbar(dom, {
			suppressScrollX: true,
		});
		if (!listen) return;
		dom.addEventListener(
			'ps-scroll-y',
			_.debounce(() => {
				dispatch('scroll', {
					scrollTop: _.ceil(dom.scrollTop),
				});
			}, 100)
		);
	});

	afterUpdate(() => {
		obj.update();
	});

	onDestroy(() => {
		obj.destroy();
		obj = null;
		if (!listen) return;
		dom.removeEventListener('ps-scroll-y', () => {});
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
