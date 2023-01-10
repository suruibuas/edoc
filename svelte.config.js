import sveltePreprocess from 'svelte-preprocess';
import { markdown } from 'svelte-preprocess-markdown';
import hljs from 'highlight.js';

export default {
	preprocess: [
		sveltePreprocess(),
		markdown({
			highlight(code, lang) {
				return hljs.highlight(code, { language: lang }).value;
			},
		}),
	],
	useVitePreprocess: true,
	sendWarningsToBrowser: true,
	extensions: ['.svelte', '.md'],
	onwarn: (warning, handler) => {
		if (warning.code.startsWith('a11y')) return;
		handler(warning);
	},
};
