import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export default function create() {
	const mdDir = path.resolve('src/md');
	// 存放目录的数组
	const arr = [];
	// 递归读取md文件
	function readDir(dir, parent = arr) {
		const file = fs.readdirSync(dir);
		file.forEach((item, i) => {
			parent.push({
				name: item,
				child: [],
				dir,
			});
			const nowDir = `${dir}${path.sep}${item}`;
			const stat = fs.statSync(nowDir);
			if (stat.isDirectory()) {
				readDir(nowDir, parent[i].child);
			}
		});
	}
	readDir(mdDir);
	// 路由数据
	const routeData = {};
	// 目录排序
	function sortDir(data) {
		data.sort((a, b) => parseInt(a.name) - parseInt(b.name));
		data.forEach((item) => {
			const tmp = item;
			let name = _.replace(tmp.name, /([0-9]+)、/, '');
			name = _.replace(name, '.md', '');
			if (item.child.length > 0) sortDir(item.child);
			else if (tmp.name.endsWith('.md')) {
				tmp.href = `#/doc/${name}`;
				let href = _.replace(tmp.dir, mdDir, '');
				href = _.replace(href, '\\', '/');
				routeData[`/${encodeURIComponent(name)}`] = `@/md${href}/${tmp.name}`;
			}
			tmp.name = name;
		});
	}
	sortDir(arr);

	// 生成menu.js文件
	const string = `export default ${JSON.stringify(arr)};`;
	fs.writeFile('./src/menu.js', string, (err) => {
		console.log(`文档结构：更新${err ? '失败' : '成功'}`);
	});

	// 生成路由doc.js文件
	const route = `
	import { wrap } from 'svelte-spa-router/wrap';
	import Loading from '@/components/Loading.svelte';

	export const routes = {
		${(() => {
			let html = '';
			Object.entries(routeData).forEach((item) => {
				html += `
					'${item[0]}': wrap({
						asyncComponent: () => import('${item[1]}'),
						loadingComponent: Loading,
					}),
				`;
			});
			return html;
		})()}
	};
	`;
	fs.writeFile('./src/router/doc.js', route, (err) => {
		console.log(`文档路由：更新${err ? '失败' : '成功'}`);
	});
}
