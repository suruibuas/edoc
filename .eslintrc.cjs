module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['jsx-a11y', 'import', 'prettier', '@typescript-eslint'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	globals: {},
	rules: {
		// 允许使用 console
		'no-console': 'off',
		// parseInt方法不强制使用第二个参数
		radix: 'off',
		// 强制使用Linux的LF换行符
		'linebreak-style': ['error', 'unix'],
		// 关闭要求 for-in 循环中有一个 if 语句
		'guard-for-in': 'off',
		// 允许直接返回 await 结果
		'no-return-await': 'off',
		// 不要求使用 Error 对象作为 Promise 拒绝的原因
		'prefer-promise-reject-errors': 'off',
		// 允许使用 continue
		'no-continue': 'off',
		// 注释必须有空格
		'spaced-comment': ['error', 'always'],
		// 函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
		'new-cap': 'error',
		// 强制使用骆驼拼写法命名约定，默认 always，关闭使用 never
		camelcase: [
			'warn',
			{
				properties: 'never',
			},
		],
		// 函数最多四个参数
		'max-params': ['error', 4],
		// 标识符可以_开头或结尾
		'no-underscore-dangle': 'off',
		// 禁止使用嵌套的三元表达式,避免代码难以理解
		'no-nested-ternary': 'error',
		// 关闭禁止不必要的构造函数
		'no-useless-constructor': 'error',
		// 关闭禁止使用++，--
		'no-plusplus': 'off',
		// 禁止有不能执行的代码
		'no-unreachable': 'error',
		// 关闭禁止在正则表达式中使用控制字符
		'no-control-regex': 'off',
		// 关闭强制类方法使用 this
		'class-methods-use-this': 'off',
		// 关闭未定义前不能使用
		'no-use-before-define': 'off',
		// 关闭外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
		'no-shadow': 'error',
		// 禁止多余的分号
		'no-extra-semi': 'error',
		// 要求使用 === 和 !==
		eqeqeq: ['error', 'always'],
		// 强制在 JSX 属性中一致地使用双引号
		'jsx-quotes': ['error', 'prefer-double'],
		// 没有找到对应模块不报错
		'import/no-unresolved': [
			'error',
			{
				ignore: ['(png|jpg|jpeg|gif|svg)$', '^@'],
			},
		],
		// 允许导入的文件省略后缀
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				mjs: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		// 关闭单个导出时必须使用默认导出
		'import/prefer-default-export': 'off',
		// 关闭强制要求可选文本的所有元素都具有有意义的信息，以便传回给最终用户。
		'jsx-a11y/alt-text': 'off',
		// 关闭强制一个可单击的非交互元素至少有一个键盘事件监听器。
		'jsx-a11y/click-events-have-key-events': 'off',
		// 关闭强制要求有交互操作的静态标签设置role属性
		'jsx-a11y/no-static-element-interactions': 'off',
		// 关闭强制要求非交互语义标签(main,hX,ul,ol,liarea)不包含交互事件(onClick等)
		'jsx-a11y/no-noninteractive-element-interactions': 'off',
		// 不允许未使用的变量
		'@typescript-eslint/no-unused-vars': 'error',
		// 关闭要求类属性和方法上的显式可访问性修饰符
		'@typescript-eslint/explicit-member-accessibility': 'off',
		// 关闭禁止对象字面值出现在类型断言表达式中(来自TSLint的no-object-literal-type-assertion)
		'@typescript-eslint/no-object-literal-type-assertion': 'off',
		// 关闭要求函数和类方法的显式返回类型
		'@typescript-eslint/explicit-function-return-type': 'off',
		// 关闭强制要求不允许出现空函数
		'@typescript-eslint/no-empty-function': 'off',
		// 关闭在导出的函数和类的公共类方法上要求显式的返回和参数类型
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		// 禁止在定义变量之前使用变量
		'@typescript-eslint/no-use-before-define': ['error'],
		// 禁止变量声明隐藏在外部作用域中声明的变量
		'@typescript-eslint/no-shadow': ['error'],
	},
	settings: {},
};
