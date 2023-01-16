<script>
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Router from 'svelte-spa-router';
	import Header from '@/components/Header.svelte';
	import Menu from '@/components/Menu.svelte';
	import Scroll from '@/components/Scroll.svelte';
	import { routes } from '@/router/doc.js';
	import menu from '@/menu.js';
	import { location } from 'svelte-spa-router';
	import '@/style/common/markdown.less';
	import 'highlight.js/styles/github-dark.css';

	let docMain = {};
	let sidebar = [];
	let sideNum = -1;
	let h3 = [];
	let sideDom;
	let isMobile = getContext('mobile');
	let boxHeight = window.innerHeight - 124;
	let menuShow = isMobile ? false : true;

	const page = 'doc';
	const _location = `#${decodeURIComponent($location)}`;

	$: sideTop = sideNum == 0 ? 16 : sideNum * 32 + 16;

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
		docMain = dom;
		dom.scrollTop = 0;
		scroll.update();
		sidebar = [];
		h3 = dom.querySelectorAll('h3');
		h3.forEach((item, key) => {
			sidebar[key] = item.innerHTML;
		});
		if (isMobile) {
			menuShow = false;
		}
	}

	function handleJump(index) {
		docMain.scrollTop = h3[index].offsetTop;
		sideNum = index;
	}

	function handleSide(e) {
		let key = 0;
		for (let item of h3) {
			if (e.detail.scrollTop < item.offsetTop) {
				sideNum = key - 1;
				return;
			}
			key++;
		}
		sideNum = h3.length - 1;
	}

	function handleOpenMenu() {
		menuShow = !menuShow;
	}

	function handleGoTop() {
		docMain.scrollTop = 0;
	}
</script>

<!-- 顶部 -->
<Header {page} />

{#if isMobile}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="open-menu">
		<div on:click={handleOpenMenu}>
			<i class="ri-menu-unfold-line" />
			展开目录
		</div>
		<div on:click={handleGoTop}>返回顶部</div>
	</div>
{/if}

<!-- 文档主体 -->
<div id="doc" class="whole">
	{#if menuShow}
		<Scroll height={boxHeight}>
			<div
				class="menu"
				transition:fly={{
					duration: isMobile ? 200 : 0,
					x: -200,
					opacity: 0,
					easing: quintOut,
				}}
			>
				<Menu data={menu} />
			</div>
		</Scroll>
	{/if}

	<div class="doc">
		<Scroll
			height={boxHeight}
			listen={true}
			let:obj
			let:dom
			on:scroll={handleSide}
		>
			<Router {routes} prefix="/doc" on:routeLoaded={loaded(obj, dom)} />
		</Scroll>
	</div>

	{#if !isMobile}
		<div class="side">
			{#each sidebar as name, index}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<p
					class:current={sideNum == index}
					on:click={() => {
						handleJump(index);
					}}
				>
					{name}
				</p>
			{/each}
			<div
				bind:this={sideDom}
				class="hl"
				class:show={sideNum > -1}
				style="top: {sideTop}px;"
			/>
		</div>
	{/if}
</div>

<style lang="less">
	:global(.hljs-comment) {
		color: #999;
		font-size: 14px;
		word-wrap: break-word;
		word-break: break-all;
		white-space: pre-wrap;
	}
</style>
