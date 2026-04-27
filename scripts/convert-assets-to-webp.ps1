param(
    [string]$SourceDir = "assets/original",
    [string]$OutputDir = "assets",
    [int]$Quality = 82,
    [string]$MagickPath = "",
    [switch]$RebuildAll
)

$ErrorActionPreference = "Stop"

function Resolve-MagickCommand {
    param([string]$ConfiguredPath)

    if ($ConfiguredPath -and (Test-Path $ConfiguredPath)) {
        return (Resolve-Path $ConfiguredPath).Path
    }

    $defaultPath = "C:\Program Files\ImageMagick-7.1.2-Q16-HDRI\magick.exe"
    if (Test-Path $defaultPath) {
        return $defaultPath
    }

    $magickOnPath = Get-Command magick -ErrorAction SilentlyContinue
    if ($magickOnPath) {
        return $magickOnPath.Source
    }

    throw "ImageMagick not found. Install it, add 'magick' to PATH, or pass -MagickPath."
}

$projectRoot = (Get-Location).Path
$resolvedSourceDir = Join-Path $projectRoot $SourceDir
$resolvedOutputDir = Join-Path $projectRoot $OutputDir

if (-not (Test-Path $resolvedSourceDir)) {
    throw "Source directory '$SourceDir' does not exist from '$projectRoot'."
}

if (-not (Test-Path $resolvedOutputDir)) {
    New-Item -Path $resolvedOutputDir -ItemType Directory | Out-Null
}

$magickExe = Resolve-MagickCommand -ConfiguredPath $MagickPath
$inputFiles = Get-ChildItem -Path $resolvedSourceDir -File |
    Where-Object { $_.Extension -match '^\.(png|jpg|jpeg|tif|tiff|bmp)$' }

if (-not $inputFiles) {
    Write-Host "No supported image files found in '$SourceDir'."
    exit 0
}

$convertedCount = 0
$skippedCount = 0

foreach ($file in $inputFiles) {
    $targetName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name) + ".webp"
    $targetPath = Join-Path $resolvedOutputDir $targetName

    if ((-not $RebuildAll) -and (Test-Path $targetPath)) {
        Write-Host "Skip: $($file.Name) -> $targetName (already exists)"
        $skippedCount += 1
        continue
    }

    & $magickExe $file.FullName -quality $Quality $targetPath
    Write-Host "Convert: $($file.Name) -> $targetName (quality $Quality)"
    $convertedCount += 1
}

Write-Host ""
Write-Host "Done. Converted: $convertedCount | Skipped: $skippedCount"
