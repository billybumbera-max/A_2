# Lead Finder — businesses with no website

Finds local businesses on Google Maps that have **no website** — ideal leads for
web/automation outreach (a natural fit for Autohive). It uses the official
**Google Places API (New)**, where the website field is explicit, so "no website"
is a reliable signal rather than a guess.

## Setup

1. Create a Google Cloud project and **enable two APIs**: *Places API (New)* and
   *Geocoding API* — <https://console.cloud.google.com/>
2. Create an API key (Credentials → Create credentials → API key).
3. Install the one dependency:

   ```bash
   pip install requests
   ```

> Cost: Google gives ~$200/month of free Maps Platform usage, which covers a lot
> of searches. Keep the key restricted to these two APIs.

## Use

```bash
export GOOGLE_MAPS_API_KEY=your_key_here

# Gyms within 15 km of Austin, write a CSV of leads
python3 find_no_website.py --query "gym" --location "Austin, TX" --radius 15000 --csv gyms.csv

# Boutique fitness studios around a zip code
python3 find_no_website.py --query "fitness studio" --location "78704"
```

### Options

| Flag | Meaning | Default |
|------|---------|---------|
| `--query` | What to search (`gym`, `fitness studio`, `crossfit`, `yoga studio`) | required |
| `--location` | City, area, or zip — geocoded automatically | required |
| `--radius` | Search radius in meters | `15000` |
| `--csv` | Write results to this CSV | none (prints only) |
| `--max-pages` | Result pages to scan (~20 per page) | `5` |

## Output

Prints each lead's name, phone, address, and rating, and (with `--csv`) writes a
spreadsheet with `name, phone, address, rating, reviews, maps_url`.

## Notes / tips

- Run several queries (`gym`, `crossfit`, `yoga studio`, `personal trainer`) to
  widen coverage — Google buckets them differently.
- A missing website on Google often means the owner only has a Facebook/Instagram
  page → a strong pitch opportunity.
- Always confirm by phone before reaching out; listings can be stale.
