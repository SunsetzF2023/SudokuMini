#!/bin/bash

echo "🚀 开始部署 SudokuMini 到 GitHub..."

# 添加所有修改的文件
git add .

# 提交更改（使用时间戳作为提交信息）
git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"

# 推送到 GitHub
git push origin master

echo "✅ 代码推送完成！"
echo "🔄 GitHub Actions 将自动构建并部署"
echo "📱 GitHub Pages 将在几分钟内自动更新"
echo "🔗 访问地址: https://sunsetzf2023.github.io/SudokuMini/"
