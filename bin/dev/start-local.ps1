param(
  [int]$Port = 4321
)

$ErrorActionPreference = 'Stop'
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..\..')

Set-Location $repoRoot
$env:ASTRO_TELEMETRY_DISABLED = '1'

npm run dev -- --port $Port
