# edoc

#### 演示

[演示](http://edoc.eui6.com)

#### 介绍

基于 svelte 开发的文档工具，只需要编写 markdown 文件，即可生成在线文档。

#### 安装教程

```
// 拉取代码
git clone https://gitee.com/suruibuas/edoc.git
// 进入目录
cd edoc
// 安装依赖
npm i
```

#### 撰写

```
npm run dev
```

#### 打包

```
npm run build
```

#### 使用说明

进入 src/md 目录创建 markdown 文档，目录或者.md 文档前加上序号（1、），左侧栏的目录会按照该序号进行排序

- src
  - md
    - 1、开始
      - 1、概述.md
      - 2、分析.md
    - 2、客户端
      - 1、JAVA.md
      - 2、GO.md
      - 3、PHP.md
      - 4、PYTHON.md

相关配置文件在：`src/config.js` 中

#### 发布

文档编写完成后，运行 `npm run build`，将 `dist` 目录中的文件上传至服务器即可。

#### 交流

官方 QQ 群：651279187（未满）
