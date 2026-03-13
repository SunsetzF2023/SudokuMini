# 本地开发环境安装指南

## 1. 安装 Node.js

访问 [Node.js 官网](https://nodejs.org/) 下载并安装 Node.js 18+ 版本。

## 2. 验证安装

打开命令行，运行：
```bash
node --version
npm --version
```

## 3. 安装项目依赖

在项目根目录运行：
```bash
npm install
```

## 4. 启动开发服务器

```bash
npm run dev
```

## 5. 构建项目

```bash
npm run build
```

## 📁 项目结构说明

- `index.html` - 开发时的入口文件（不会被直接部署）
- `src/` - TypeScript 源代码目录
- `dist/` - 构建后的文件目录（这才是实际部署的内容）
- `gh-pages` 分支 - GitHub Pages 部署分支

## 🚀 部署流程

1. 本地修改代码
2. 运行 `deploy.bat` 推送到 GitHub
3. GitHub Actions 自动构建并部署到 gh-pages 分支
4. 访问 https://sunsetzf2023.github.io/SudokuMini/
