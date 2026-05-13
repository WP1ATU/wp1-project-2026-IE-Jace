#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "Usage: ./ec2-bootstrap.sh <repo-url> [branch]"
  exit 1
fi

REPO_URL="$1"
BRANCH="${2:-main}"
APP_ROOT="/opt/sky-observer"
SERVER_DIR="$APP_ROOT/server"

sudo apt-get update
sudo apt-get install -y curl git

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  sudo npm install -g pm2
fi

sudo mkdir -p "$APP_ROOT"
sudo chown -R "$USER":"$USER" "$APP_ROOT"

if [ ! -d "$APP_ROOT/.git" ]; then
  git clone --branch "$BRANCH" "$REPO_URL" "$APP_ROOT"
else
  git -C "$APP_ROOT" fetch origin
  git -C "$APP_ROOT" checkout "$BRANCH"
  git -C "$APP_ROOT" pull origin "$BRANCH"
fi

cd "$SERVER_DIR"
npm ci --omit=dev
mkdir -p logs

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created $SERVER_DIR/.env from template. Edit it before production use."
fi

pm2 delete sky-observer-api >/dev/null 2>&1 || true
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup systemd -u "$USER" --hp "$HOME"

echo "EC2 bootstrap complete. Edit .env as needed and run: pm2 restart sky-observer-api"
