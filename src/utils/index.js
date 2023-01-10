// 引入图片
export const require = (name = '') =>
	new URL(`/src/assets/img/${name}`, import.meta.url).href;
