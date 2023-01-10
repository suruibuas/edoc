<script>
	import { getContext } from 'svelte';
	let conf = getContext('config');
	export let page = '';
</script>

<header class:whole={page != 'home'}>
	<div class="logo">
		<img src="/logo_inverse.png" alt={conf['name']} />
		<span>{conf['name']}</span>
	</div>
	<div class="nav">
		{#each conf['nav'] as row}
			<a
				href={row.url}
				class:active={(row.url === '#/' && page === 'home') ||
					row.url.includes(page)}
			>
				{row.name}
			</a>
		{/each}
	</div>
	<div class="icon">
		{#if conf['github'] != ''}
			<a
				href={conf['github']}
				target="_blank"
				title="点击访问GITHUB仓库"
				rel="noreferrer"
			>
				<i class="ri-github-line" />
			</a>
		{/if}
		{#if conf['qqgroup'] != ''}
			<a
				href={conf['qqgroup']}
				target="_blank"
				rel="noreferrer"
				title="点击加官方交流群"
			>
				<i class="ri-qq-line color-blue" />
			</a>
		{/if}
		{#if conf['wechat'] === true}
			<i class="ri-wechat-2-line color-green" />
		{/if}
	</div>
</header>
{#if page == 'home'}
	<div class="bg-box" />
{/if}
