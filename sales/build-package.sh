#!/usr/bin/env bash
# Builds the sellable template package: dist/keystone-template-v1.zip
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STAGE="$(mktemp -d)/keystone-template"
DIST="$ROOT/dist"
ZIP="$DIST/keystone-template-v1.zip"

mkdir -p "$STAGE/screenshots" "$DIST"

# Product files
cp "$ROOT/index.html" "$ROOT/styles.css" "$ROOT/script.js" "$STAGE/"

# Buyer-facing docs
cp "$ROOT/sales/template/SETUP.md"     "$STAGE/SETUP.md"
cp "$ROOT/sales/template/LICENSE.txt"  "$STAGE/LICENSE.txt"

# Screenshots (pass a dir containing desktop-hero.png etc. as $1, default /tmp)
SHOTS="${1:-/tmp}"
for pair in "keystone-hero.png:desktop-hero.png" \
            "keystone-full.png:desktop-full.png" \
            "keystone-mobile.png:mobile.png"; do
  src="$SHOTS/${pair%%:*}"; dst="$STAGE/screenshots/${pair##*:}"
  [ -f "$src" ] && cp "$src" "$dst" || echo "note: missing screenshot $src (skipped)"
done

rm -f "$ZIP"
(cd "$(dirname "$STAGE")" && zip -rq "$ZIP" "$(basename "$STAGE")")
echo "Built: $ZIP"
unzip -l "$ZIP"
