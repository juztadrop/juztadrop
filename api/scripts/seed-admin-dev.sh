#!/usr/bin/env bash
# Seeds the first moderator (dashboard admin) via POST /moderator/seed.
# Requires: API running, X_AUTH_ID matching the server env, empty moderators table.
#
# Usage:
#   ./scripts/seed-admin-dev.sh
#   API_BASE_URL=http://127.0.0.1:3001 MODERATOR_SEED_EMAIL=you@example.com ./scripts/seed-admin-dev.sh
#
# Env (optional unless X_AUTH_ID missing from api/.env):
#   API_BASE_URL       — default http://localhost:3001
#   MODERATOR_SEED_EMAIL — email for the new moderator user; default admin@justadrop.local
#   X_AUTH_ID          — must equal the API process X_AUTH_ID (loaded from api/.env if unset)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
API_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

API_BASE_URL="${API_BASE_URL:-http://localhost:3001}"
MODERATOR_SEED_EMAIL="${MODERATOR_SEED_EMAIL:-admin@justadrop.local}"

load_x_auth_id_from_dotenv() {
  local env_file="$API_DIR/.env"
  [[ -f "$env_file" ]] || return 0
  local line
  line="$(grep -E '^[[:space:]]*X_AUTH_ID=' "$env_file" | tail -n 1 | tr -d '\r')" || true
  [[ -n "${line:-}" ]] || return 0
  local val="${line#*=}"
  val="${val#\"}"
  val="${val%\"}"
  val="${val#\'}"
  val="${val%\'}"
  export X_AUTH_ID="$val"
}

if [[ -z "${X_AUTH_ID:-}" ]]; then
  load_x_auth_id_from_dotenv
fi

if [[ -z "${X_AUTH_ID:-}" ]]; then
  echo "error: X_AUTH_ID is not set. It must match the API server (see api/.env.example)." >&2
  exit 1
fi

base="${API_BASE_URL%/}"
url="${base}/moderator/seed"

if command -v jq >/dev/null 2>&1; then
  payload="$(jq -cn --arg email "$MODERATOR_SEED_EMAIL" '{email: $email}')"
else
  payload="$(printf '{"email":"%s"}' "${MODERATOR_SEED_EMAIL//\"/\\\"}")"
fi

tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT

code="$(
  curl -sS -o "$tmp" -w '%{http_code}' -X POST "$url" \
    -H 'Content-Type: application/json' \
    -H "x-auth-id: ${X_AUTH_ID}" \
    -d "$payload"
)"

if command -v jq >/dev/null 2>&1; then
  jq . <"$tmp" 2>/dev/null || cat "$tmp"
else
  cat "$tmp"
fi
echo

if [[ "$code" != "200" ]]; then
  echo "error: HTTP $code (expected 200)" >&2
  exit 1
fi
