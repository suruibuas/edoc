/** *******************************************************************************
 ***                     CONFIDENTIAL  ---  SURUI STUDIOS                      ***
 *********************************************************************************
 *
 *                       项目 : svelte
 *
 *                       文件 : vite.config.js
 *
 *                       开发 : 苏睿 / 317953536@qq.com
 *
 *                       开始 : 2022-07-25
 *
 *                       更新 :
 *
 *                       说明 : vite配置文件
 *
 *********************************************************************************
 * 更新日志：
 *
 *********************************************************************************/

import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import postcssPresetEnv from 'postcss-preset-env';
import chokidar from 'chokidar';
import create from './create';

chokidar.watch(path.resolve('src/md')).on('all', (event) => {
	if (event === 'change') return;
	create();
});

export default defineConfig(({ mode }) => {
	// 根据当前环境读取环境变量配置文件
	const Config = loadEnv(
		// 当前环境
		mode,
		// 配置文件路径
		`${process.cwd()}/env`,
		// 配置参数统一前缀
		'EUI_'
	);
	return {
		// 项目根目录
		root: process.cwd(),
		// 基础路径
		base: './',
		// 公共资源的目录
		publicDir: 'public',
		// 缓存文件目录
		cacheDir: 'node_modules/.vite',
		// 更多配置
		resolve: {
			// 别名配置
			alias: {
				// 根目录
				'@': path.resolve(__dirname, 'src'),
			},
			// 导入时可以省略扩展名的文件类型
			extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.svelte', '.scss'],
		},
		// css配置
		css: {
			// 是否开启sourceMap
			devSourcemap: mode === 'dev',
			// 指定传递给CSS预处理器的选项
			preprocessorOptions: {
				// less配置
				less: {
					// 始终处理数学计算
					math: 'always',
					// 全局变量，在这里定义less变量，则所有.less文件中可以直接使用
					globalVars: {},
				},
				scss: {
					// 全局引入变量
					additionalData: `@use '@/styles/var' as *;`,
				},
			},
			modules: {
				// 格式化类名规范
				// camelCase：小驼峰加中划线都可以
				// camelCaseOnly：只有小驼峰
				// dashes：中划线
				// dashesOnly：仅中划线（VITE默认）
				localsConvention: 'dashesOnly',
				// 配置模块化的类型
				// local：模块化（VITE默认），模块化会hash类名，防止冲突
				// global：全局化
				scopeBehaviour: 'local',
				// 参与类名hash的前缀
				hashPrefix: '_eui',
			},
			// postcss配置，优先级大于postcss-config.js
			postcss: {
				plugins: [postcssPresetEnv()],
			},
		},
		// 调整控制台输出的级别，可选：'info' | 'warn' | 'error' | 'silent'
		logLevel: 'info',
		// 是否清屏
		clearScreen: true,
		// .env配置文件目录
		envDir: `${process.cwd()}/env`,
		// 系统变量前缀
		envPrefix: 'EUI_',
		// 插件
		plugins: [
			svelte({
				configFile: 'svelte.config.js',
			}),
		],
		// 开发服务器配置
		server: {
			host: Config.EUI_SERVER_HOST,
			port: Config.EUI_SERVER_PORT,
			open: Config.EUI_SERVER_OPEN === 'true',
			cors: Config.EUI_SERVER_CORS === 'true',
			https: Config.EUI_SERVER_HTTPS === 'true',
			// 代理配置
			proxy: {
				'/api': {
					target: Config.EUI_API,
					changeOrigin: true,
					rewrite: (uri) => uri.replace(/^\/api/, ''),
				},
			},
			// 自定义添加的头信息
			headers: {},
		},
		// 构建配置
		build: {
			// 压缩模式
			minify: 'terser',
			rollupOptions: {
				output: {
					entryFileNames: `assest/js/[name]-[hash].js`,
					chunkFileNames: `assest/js/[name]-[hash].js`,
					assetFileNames: `assest/[name]-[hash].[ext]`,
				},
			},
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
				ie8: false,
			},
			outDir: 'dist',
			assetsDir: 'assets',
			assetsInlineLimit: 4096,
			cssCodeSplit: true,
			sourcemap: mode === 'dev',
		},
	};
});
