@echo off
echo 🔍 验证开发环境...

echo 检查 Node.js...
node --version
if %errorlevel% neq 0 (
    echo ❌ Node.js 未安装
    goto :error
)

echo 检查 npm...
npm --version
if %errorlevel% neq 0 (
    echo ❌ npm 未安装
    goto :error
)

echo 检查项目依赖...
if not exist "node_modules" (
    echo ❌ 依赖未安装，运行 npm install
    goto :error
)

echo ✅ 环境配置完成！
echo 🚀 现在可以运行以下命令：
echo    npm run dev    - 启动开发服务器
echo    npm run build  - 构建项目
echo    deploy.bat     - 部署到 GitHub
goto :end

:error
echo ❌ 请先运行 install-node.bat 安装环境
pause

:end
pause
