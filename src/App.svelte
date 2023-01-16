<script>
	import Router from 'svelte-spa-router';
	import { routes } from '@/router/';
	import { setContext } from 'svelte';
	import config from '@/config.js';
	setContext('config', config);
	setContext('mobile', window.innerWidth > 576 ? false : true);
</script>

<Router {routes} />
