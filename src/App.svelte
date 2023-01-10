<script>
	import Router from 'svelte-spa-router';
	import { routes } from '@/router/';
	import { setContext } from 'svelte';
	import config from '@/config.js';
	setContext('config', config);
</script>

<Router {routes} />
