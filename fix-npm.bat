@echo off
echo 🔧 正在修复 npm 安装问题...

echo 🧹 清理 npm 缓存...
npm cache clean --force

echo 🗑️ 删除旧的 node_modules...
if exist "node_modules" (
    rmdir /s /q node_modules
    echo ✅ node_modules 已删除
) else (
    echo ℹ️ node_modules 不存在
)

echo 🗑️ 删除 package-lock.json...
if exist "package-lock.json" (
    del package-lock.json
    echo ✅ package-lock.json 已删除
) else (
    echo ℹ️ package-lock.json 不存在
)

echo 📦 重新安装依赖...
npm install

if %errorlevel% equ 0 (
    echo ✅ 安装成功！
    echo 🚀 现在可以运行 npm run dev
) else (
    echo ❌ 安装失败，请检查错误信息
    echo 💡 尝试以管理员身份运行此脚本
)

pause
