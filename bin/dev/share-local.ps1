param(
  [int]$Port = 4321,
  [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..\..')
$astro = Join-Path $repoRoot 'node_modules\.bin\astro.cmd'

Set-Location $repoRoot
$env:ASTRO_TELEMETRY_DISABLED = '1'

if (-not (Test-Path $astro)) {
  throw 'Astro is not installed. Run npm install first.'
}

if (-not $SkipBuild) {
  npm run build
}

$addresses = [System.Net.Dns]::GetHostEntry([System.Net.Dns]::GetHostName()).AddressList |
  Where-Object {
    $_.AddressFamily -eq [System.Net.Sockets.AddressFamily]::InterNetwork -and
    $_.IPAddressToString -ne '127.0.0.1' -and
    -not $_.IPAddressToString.StartsWith('169.254.')
  } |
  Select-Object -ExpandProperty IPAddressToString -Unique

Write-Host ''
Write-Host 'Wedding website preview is starting.'
Write-Host 'Keep this terminal window open while Gabriela is viewing the site.'
Write-Host ''
Write-Host 'On this computer:'
Write-Host "  http://127.0.0.1:$Port/en/"
Write-Host ''

if ($addresses) {
  Write-Host 'On the same Wi-Fi/network, share one of these URLs:'
  foreach ($address in $addresses) {
    Write-Host "  http://$address`:$Port/en/"
  }
} else {
  Write-Host 'No LAN address was detected. Check Wi-Fi/network settings if another device needs access.'
}

Write-Host ''
Write-Host 'If Windows Firewall asks, allow Node.js on private networks.'
Write-Host ''

& $astro preview --host 0.0.0.0 --port $Port
