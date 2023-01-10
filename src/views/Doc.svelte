<script>
	import Router from 'svelte-spa-router';
	import Header from '@/components/Header.svelte';
	import Menu from '@/components/Menu.svelte';
	import Scroll from '@/components/Scroll.svelte';
	import { routes } from '@/router/doc.js';
	import menu from '@/menu.js';
	import { location } from 'svelte-spa-router';
	import '@/style/common/markdown.less';
	import 'highlight.js/styles/monokai-sublime.css';

	const page = 'doc';
	const boxHeight = window.innerHeight - 124;
	const _location = `#${decodeURIComponent($location)}`;

	export let params = {};
	console.log(params);

	let ckey = -1;
	let find = false;
	function initMenu(data) {
		data.map((item, key) => {
			if (find) return;
			if (item.child.length > 0) {
				ckey = key;
				initMenu(item.child);
			} else {
				if (_location === item.href) find = true;
			}
		});
	}
	initMenu(menu);
	if (ckey > -1) {
		menu[ckey].isOpen = true;
		menu[ckey].child.map((item) => {
			item.isShow = true;
		});
	}

	function loaded(scroll, dom) {
		dom.scrollTop = 0;
		scroll.update();
	}
</script>

<!-- 顶部 -->
<Header {page} />

<!-- 文档主体 -->
<div id="doc" class="whole">
	<Scroll height={boxHeight}>
		<div class="menu">
			<Menu data={menu} />
		</div>
	</Scroll>

	<div class="doc">
		<Scroll height={boxHeight} let:obj let:dom>
			<Router {routes} prefix="/doc" on:routeLoaded={loaded(obj, dom)} />
		</Scroll>
	</div>
</div>

<style lang="less">
	:global(.hljs-comment) {
		color: #999;
		font-size: 14px;
	}
</style>
