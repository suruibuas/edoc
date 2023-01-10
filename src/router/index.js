import { wrap } from 'svelte-spa-router/wrap';
import doc from '@/views/Doc.svelte';

export const routes = {
	'/': wrap({
		asyncComponent: () => import('@/views/Home.svelte'),
	}),
	'/doc': doc,
	'/doc/*': doc,
	'/auth': wrap({
		asyncComponent: () => import('@/views/Auth.svelte'),
	}),
};
