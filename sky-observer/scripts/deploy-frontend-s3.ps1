param(
  [Parameter(Mandatory = $true)]
  [string]$BucketName,

  [Parameter(Mandatory = $true)]
  [string]$Region,

  [string]$DistributionId = "",
  [switch]$Build
)

$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$distPath = Join-Path $projectRoot "dist\sky-observer\browser"

if ($Build) {
  Write-Host "Building Angular production bundle..."
  npm run build --configuration production
}

if (-not (Test-Path $distPath)) {
  throw "Build output not found at '$distPath'. Run 'npm run build --configuration production' first or pass -Build."
}

Write-Host "Syncing static files to s3://$BucketName ..."
aws s3 sync $distPath "s3://$BucketName" --delete --region $Region

if ($DistributionId) {
  Write-Host "Creating CloudFront invalidation on distribution '$DistributionId' ..."
  aws cloudfront create-invalidation --distribution-id $DistributionId --paths "/*"
}

Write-Host "Frontend deployment complete."
