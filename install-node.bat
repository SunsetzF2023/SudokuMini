@echo off
echo 🚀 正在检查 Node.js 安装状态...

REM 检查 Node.js 是否已安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js 未安装
    echo 📥 正在打开 Node.js 官网下载页面...
    start https://nodejs.org/en/download/
    echo 📋 请下载并安装 LTS 版本（推荐 18.x 或 20.x）
    echo 🔧 安装完成后，请重新运行此脚本
    pause
    exit /b 1
)

echo ✅ Node.js 已安装
node --version
npm --version

echo 📦 正在安装项目依赖...
npm install

if %errorlevel% equ 0 (
    echo ✅ 依赖安装成功！
    echo 🚀 现在可以运行 npm run dev 启动开发服务器
) else (
    echo ❌ 依赖安装失败，请检查网络连接
)

pause
