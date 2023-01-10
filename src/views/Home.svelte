<script>
	import Header from '@/components/Header.svelte';
	import Footer from '@/components/Footer.svelte';
	import Block from '@/components/Block.svelte';
	import Scroll from '@/components/Scroll.svelte';
	import { require } from '@/utils';
	import { getContext } from 'svelte';

	let conf = getContext('config');
	let skin = 'dark';
	let page = 'home';
	$: preview = require(`${skin}.jpg`);
</script>

<Scroll>
	<!-- 顶部 -->
	<Header {page} />
	<!-- 首屏Banner -->
	<section>
		<div class="banner">
			<h1>{conf['info']['bigTitle']}</h1>
			<h2>{conf['info']['slogan']}</h2>
			{#each conf['info']['description'] as val}
				<h3>{val}</h3>
			{/each}
			<div class="btn">
				<a href="#/doc/概述">开始使用</a>
				<a href="#/doc/演示">查看演示</a>
			</div>
		</div>
	</section>
	<!-- 项目预览 -->
	{#if conf['preview']}
		<section>
			<div class="preview">
				<img src={preview} alt="项目预览" />
			</div>
			<div class="change">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<i
					class="ri-moon-line"
					on:click={() => {
						skin = 'dark';
					}}
				/>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<i
					class="ri-sun-line"
					on:click={() => {
						skin = 'light';
					}}
				/>
				<div class={skin} />
			</div>
		</section>
	{/if}
	<!-- 功能介绍 -->
	<div class="intro">
		<div class="block-box">
			<Block col="4">
				<i class="ri-brush-2-line color-blue" />
				<h4>风格统一</h4>
				<h6>官方默认提供的组件都保持高度的一致性</h6>
			</Block>
			<Block col="4">
				<i class="ri-html5-line color-orange" />
				<h4>纯原生写法</h4>
				<h6>页面模版保持原生HTML写法，无学习成本</h6>
			</Block>
			<Block col="4">
				<i class="ri-battery-2-charge-line color-green" />
				<h4>极速启动</h4>
				<h6>内置了HTTP服务器，秒级启动</h6>
			</Block>
		</div>
	</div>
	<!-- 底部 -->
	<Footer {page} />
</Scroll>
