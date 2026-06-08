<#
.SYNOPSIS
Trae Solo 专用一键提交+推送脚本（安全版）
#>

# ========== 配置区（可改） ==========
$repoPath = "D:\Program Files\Trae_Solo\kids-english-v2"
$remote = "origin"
$mainBranch = "main"
# ====================================

# 进入项目目录
Set-Location $repoPath -ErrorAction Stop

# 检查是否是 Git 仓库
if (-not (Test-Path ".git")) {
    Write-Host "❌ 错误：当前目录不是 Git 仓库" -ForegroundColor Red
    pause
    exit 1
}

# 1. 拉取 main 最新（防止冲突）
Write-Host "`n🔄 拉取 $remote/$mainBranch 最新代码..." -ForegroundColor Cyan
git checkout $mainBranch
git pull $remote $mainBranch
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 拉取失败，请手动处理冲突" -ForegroundColor Red
    pause
    exit 1
}

# 2. 生成分支名（自动：fix/日期-时间）
$dateStr = Get-Date -Format "yyyyMMdd-HHmmss"
$newBranch = "fix/$dateStr"

Write-Host "`n🚀 创建新分支：$newBranch" -ForegroundColor Cyan
git checkout -b $newBranch

# 3. 检查是否有修改
$status = git status --porcelain
if (-not $status) {
    Write-Host "`n✅ 没有文件修改，无需提交" -ForegroundColor Green
    pause
    exit 0
}

# 4. 提交信息（可输入，默认带时间）
$defaultMsg = "feat: Trae自动更新 $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
Write-Host "`n✏️ 提交信息（直接回车=默认）：" -ForegroundColor Cyan
$msg = Read-Host "输入提交信息"
if (-not $msg) { $msg = $defaultMsg }

# 5. 提交所有文件
Write-Host "`n📦 提交所有修改..." -ForegroundColor Cyan
git add .
git commit -m $msg

# 6. 推送到远程
Write-Host "`n☁️ 推送到 $remote/$newBranch ..." -ForegroundColor Cyan
git push -u $remote $newBranch

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ 成功！已提交并推送至：$newBranch" -ForegroundColor Green
    Write-Host "👉 请去 GitHub 网页创建 PR 合并到 main" -ForegroundColor Yellow
} else {
    Write-Host "`n❌ 推送失败" -ForegroundColor Red
}

pause