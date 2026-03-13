# SudokuMini

一个基于 React + TypeScript + Tailwind CSS 的数独游戏，采用深色科技感 UI 设计。

## 特性

- 🎮 完整的数独游戏逻辑
- 🎨 模拟 Windsurf/Cursor IDE 的深色模式 UI
- ⌨️ 支持键盘操作（数字键、方向键、删除键）
- 🎯 智能高亮（同行、同列、同九宫格、相同数字）
- ❌ 实时错误检测
- 🏆 胜利判定
- 📱 响应式设计

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **部署平台**: GitHub Pages

## 开始使用

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 部署到 GitHub Pages

### 1. 配置 GitHub Pages

项目已配置好 GitHub Pages 部署，只需要：

```bash
npm run deploy
```

### 2. 手动部署

如果需要手动部署到 GitHub Pages：

1. 构建项目：
   ```bash
   npm run build
   ```

2. 将 `dist` 目录推送到 `gh-pages` 分支：
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

## 游戏操作

### 鼠标操作
- 点击格子选中
- 点击数字按钮填入数字
- 点击清除按钮删除数字

### 键盘操作
- **数字键 1-9**: 填入对应数字
- **Delete/Backspace/0**: 清除当前格子
- **方向键**: 移动选中格子
- **ESC**: 取消选中

## 游戏规则

- 每行、每列、每个 3×3 九宫格内的数字 1-9 不能重复
- 灰色数字为题目固定的数字，不能修改
- 填入所有数字且符合规则即为胜利

## 项目结构

```
src/
├── components/          # React 组件
│   ├── SudokuGrid.tsx  # 数独网格组件
│   └── NumberPad.tsx    # 数字输入板组件
├── types/              # TypeScript 类型定义
│   └── sudoku.ts       # 数独相关类型
├── utils/              # 工具函数
│   └── sudoku.ts       # 数独生成和验证逻辑
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 开发说明

### 数独生成算法

使用回溯算法生成具有唯一解的数独谜题：

1. 首先填充对角线的 3×3 九宫格
2. 使用回溯算法完成整个数独
3. 根据难度随机移除部分数字

### UI 设计

采用深色科技感设计，参考 Windsurf/Cursor IDE 的配色方案：

- 背景色: `#0b0d11` (深沉蓝黑色)
- 表面色: `#1e1e1e` (深灰色)
- 边框色: `#2d3139` (科技感边框)
- 文本色: `#d4d4d4` (柔和白色)
- 强调色: `#007acc` (IDE 蓝色)

## 许可证

MIT License
