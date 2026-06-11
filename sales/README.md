# 🔒 Sale kit (internal — not part of the product)

This folder is YOUR tool for selling the site. It is **not** part of what the
buyer receives.

| File | What it's for |
|---|---|
| `gumroad-listing.md` | Copy/paste listing for selling this as a **template** on Gumroad |
| `flippa-listing.md` | Copy/paste listing for selling the **whole site** on Flippa |
| `realtor-outreach.md` | DM/email scripts for selling it **directly to a real estate agent** |
| `template/SETUP.md` | Buyer-facing "rebrand in 10 minutes" guide (ships inside the zip) |
| `template/LICENSE.txt` | Buyer-facing license (ships inside the zip) |
| `build-package.sh` | Builds the sellable `keystone-template-v1.zip` |

## Build the sellable zip

```bash
bash sales/build-package.sh
# → dist/keystone-template-v1.zip
```

## ⚠️ Before transferring the repo to a Flippa buyer

Delete this `sales/` folder first — your listing copy and outreach scripts
are your business, not theirs:

```bash
git rm -r sales && git commit -m "Remove internal sale kit"
```
