@echo off
echo 🚀 开始部署 SudokuMini 到 GitHub...

REM 添加所有修改的文件
git add .

REM 提交更改（使用时间戳作为提交信息）
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YYYY=%dt:~0,4%"
set "MM=%dt:~4,2%"
set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%"
set "Min=%dt:~10,2%"
set "Sec=%dt:~12,2%"
set "timestamp=%YYYY%-%MM%-%DD% %HH%:%Min%:%Sec%"

git commit -m "Update: %timestamp%"

REM 推送到 GitHub
git push origin master

echo ✅ 部署完成！
echo 📱 GitHub Pages 将在几分钟内自动更新
echo 🔗 访问地址: https://sunsetzf2023.github.io/SudokuMini/
pause
