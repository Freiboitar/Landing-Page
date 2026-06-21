#!/bin/sh

set -eu

PROJECT_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
. "$PROJECT_ROOT/deployment.env"

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT HUP INT TERM

FILES="index.html styles.css script.js README.md deployment.env scripts/check-deployment.sh"
FAILED=0

printf 'Checking %s\n' "$PRODUCTION_URL"

for file in $FILES; do
  remote_file="$TMP_DIR/$file"
  mkdir -p "$(dirname -- "$remote_file")"

  if ! curl --fail --silent --show-error --location \
    --connect-timeout 10 --max-time 30 \
    "$PRODUCTION_URL/$file" --output "$remote_file"; then
    printf 'FAIL %s could not be downloaded\n' "$file"
    FAILED=1
    continue
  fi

  if cmp -s "$PROJECT_ROOT/$file" "$remote_file"; then
    printf 'OK   %s is current\n' "$file"
  else
    printf 'FAIL %s differs from the local project\n' "$file"
    FAILED=1
  fi
done

if [ "$FAILED" -ne 0 ]; then
  printf '\nDeployment is not current.\n'
  exit 1
fi

printf '\nDeployment matches the local project.\n'
