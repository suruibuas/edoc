<script>
	import { location } from 'svelte-spa-router';
	export let data = [];
	$: _location = `#${decodeURIComponent($location)}`;
	function handleOpen(param) {
		if (!param.child.length) return;
		param.isOpen = !param.isOpen;
		param.child.map((item) => {
			item.isShow = !item.isShow;
		});
		data = [...data];
		_location = '';
	}
</script>

{#each data as row}
	<div
		class:dir={row?.child?.length > 0}
		class:show={row?.isShow === true}
		class:current={_location === row.href}
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span on:click={handleOpen(row)} class:open={row.isOpen}>
			<i class="ri-arrow-right-s-line" />
			{#if row?.child.length == 0 && row?.href}
				<a href={row.href}>
					{row.name}
				</a>
			{:else}
				{row.name}
			{/if}
		</span>
		{#if row?.child?.length > 0}
			<svelte:self data={row.child} />
		{/if}
	</div>
{/each}
