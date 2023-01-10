<script>
	import Router from 'svelte-spa-router';
	import Header from '@/components/Header.svelte';
	import Footer from '@/components/Footer.svelte';
	import Menu from '@/components/Menu.svelte';
	import Scroll from '@/components/Scroll.svelte';
	import { routes } from '@/router/doc.js';
	import menu from '@/menu.js';
	let page = 'auth';
</script>

<!-- 顶部 -->
<Header {page} />

<!-- 文档主体 -->
<div id="doc" class="whole">
	<Scroll height={window.innerHeight - 124}>
		<div class="menu">
			<Menu data={menu} />
		</div>
	</Scroll>
	<div class="main">
		<Router {routes} prefix="/doc" />
	</div>
</div>
