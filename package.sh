#!/usr/bin/env bash
# Build the sellable product ZIP for Gumroad.
set -euo pipefail

NAME="ai-landing-page-pack"
OUT="dist/${NAME}.zip"

mkdir -p dist
rm -f "$OUT"

# Files/folders that make up the product the buyer receives.
INCLUDE=(
  index.html styles.css script.js gallery.html
  realestate dental fitness restaurant contractor
  screenshots google-apps-script.gs
  README.md KIT.md CUSTOMIZE.md SALES-KIT.md SERVICE-OFFER.md
  OUTREACH.md LEAD-SOURCING.md SETUP-GOOGLE-SHEET.md leads-tracker.csv
  LICENSE.txt
)

zip -r "$OUT" "${INCLUDE[@]}" \
  -x '*/.DS_Store' '*/node_modules/*' >/dev/null

echo "Built $OUT"
ls -lh "$OUT"
