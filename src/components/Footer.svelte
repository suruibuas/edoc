<script>
	import { getContext } from 'svelte';
	let conf = getContext('config');
	export let page = '';
</script>

<footer class:whole={page != 'home'}>
	<!-- 友情链接 -->
	<div class="links" class:mt0={page != 'home'}>
		<span>友情链接：</span>
		{#each conf['links'] as link}
			<a href={link.url} target="_blank" rel="noreferrer">
				{link.name}
			</a>
		{/each}
	</div>
	<!-- 版权和备案号相关信息 -->
	<div class="info">
		<span>{conf['copyright']}</span>
		<a
			class="beian"
			href="https://beian.miit.gov.cn/"
			target="_blank"
			rel="noreferrer"
		>
			{conf['beian']}
		</a>
		本文档使用
		<a href="http://edoc.eui6.com" class="hl" target="_blank" rel="noreferrer">
			edoc
		</a>
		搭建
	</div>
</footer>
