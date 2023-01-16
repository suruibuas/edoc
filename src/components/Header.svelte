<script>
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	let conf = getContext('config');
	let isMobile = getContext('mobile');
	export let page = '';

	let menuIcon = 'ri-menu-3-line';
	let menuShow = isMobile ? false : true;
	function handleShowMenu() {
		menuShow = !menuShow;
		menuIcon = menuShow ? 'ri-close-line' : 'ri-menu-3-line';
	}
</script>

<header id="mobile-header" class:whole={page != 'home'}>
	<div class="logo">
		<img src="/logo_inverse.png" alt={conf['name']} />
		<span>{conf['name']}</span>
	</div>
	{#if menuShow}
		<div
			class="nav"
			transition:fly={{
				duration: isMobile ? 200 : 0,
				y: 40,
				opacity: 0,
				easing: quintOut,
			}}
		>
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
	{/if}
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

	{#if isMobile}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i class="{menuIcon} menu" on:click={handleShowMenu} />
	{/if}
</header>
{#if page == 'home'}
	<div class="bg-box" />
{/if}
