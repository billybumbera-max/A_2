#!/usr/bin/env python3
"""
find_no_website.py — Find local businesses on Google Maps that have NO website.

Great for lead-gen: businesses without a website are prime prospects for web /
automation services. Uses the official Google Places API (New). The API returns
a `websiteUri` field only when a business actually has a website, so "no website"
is an explicit, reliable signal — far better than guessing from web search.

USAGE
-----
  export GOOGLE_MAPS_API_KEY=your_key_here
  python3 find_no_website.py --query "gym" --location "Austin, TX" --radius 15000
  python3 find_no_website.py --query "fitness studio" --location "78704" --csv leads.csv

Get an API key: https://console.cloud.google.com/  -> enable "Places API (New)".
The first $200/mo of Places usage is free (covers a lot of searches).

WHAT IT DOES
------------
1. Geocodes your --location text to lat/lng (Geocoding API).
2. Runs a Places Text Search ("gym near <location>"), paging through all results.
3. Keeps only businesses with NO website.
4. Prints them and (optionally) writes a CSV with name, phone, address, rating.
"""

import argparse
import csv
import os
import sys
import time

try:
    import requests
except ImportError:
    sys.exit("Missing dependency. Run:  pip install requests")

PLACES_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText"
GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json"

# Fields we ask the API to return. Requesting only what we need keeps cost down.
FIELD_MASK = ",".join(
    "places." + f
    for f in [
        "id",
        "displayName",
        "formattedAddress",
        "nationalPhoneNumber",
        "internationalPhoneNumber",
        "websiteUri",
        "rating",
        "userRatingCount",
        "googleMapsUri",
        "businessStatus",
    ]
)


def geocode(location: str, api_key: str):
    """Turn a free-text location ('Austin, TX' / '78704') into lat/lng."""
    resp = requests.get(
        GEOCODE_URL, params={"address": location, "key": api_key}, timeout=30
    )
    resp.raise_for_status()
    data = resp.json()
    if data.get("status") != "OK" or not data.get("results"):
        raise SystemExit(
            f"Could not geocode '{location}': {data.get('status')} "
            f"{data.get('error_message', '')}".strip()
        )
    loc = data["results"][0]["geometry"]["location"]
    return loc["lat"], loc["lng"]


def search_text(query, lat, lng, radius_m, api_key, page_token=None):
    """One page of a Places Text Search, biased to a circle around lat/lng."""
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": api_key,
        "X-Goog-FieldMask": FIELD_MASK + ",nextPageToken",
    }
    body = {
        "textQuery": query,
        "locationBias": {
            "circle": {
                "center": {"latitude": lat, "longitude": lng},
                "radius": float(radius_m),
            }
        },
    }
    if page_token:
        body["pageToken"] = page_token
    resp = requests.post(PLACES_SEARCH_URL, headers=headers, json=body, timeout=30)
    if resp.status_code != 200:
        raise SystemExit(f"Places API error {resp.status_code}: {resp.text}")
    return resp.json()


def collect(query, location, radius_m, api_key, max_pages=5):
    """Run the search across pages and return only businesses with no website."""
    lat, lng = geocode(location, api_key)
    print(f"📍 {location} -> ({lat:.5f}, {lng:.5f}), radius {radius_m} m\n")

    no_website, total = [], 0
    page_token = None
    for page in range(max_pages):
        data = search_text(query, lat, lng, radius_m, api_key, page_token)
        places = data.get("places", [])
        total += len(places)
        for p in places:
            if p.get("businessStatus") == "CLOSED_PERMANENTLY":
                continue
            if not p.get("websiteUri"):  # the whole point: no website
                no_website.append(p)
        page_token = data.get("nextPageToken")
        if not page_token:
            break
        time.sleep(2)  # token needs a moment to become valid

    print(f"Scanned {total} businesses; {len(no_website)} have no website.\n")
    return no_website


def to_row(p):
    return {
        "name": (p.get("displayName") or {}).get("text", ""),
        "phone": p.get("nationalPhoneNumber")
        or p.get("internationalPhoneNumber", ""),
        "address": p.get("formattedAddress", ""),
        "rating": p.get("rating", ""),
        "reviews": p.get("userRatingCount", ""),
        "maps_url": p.get("googleMapsUri", ""),
    }


def main():
    ap = argparse.ArgumentParser(description="Find businesses with no website.")
    ap.add_argument("--query", required=True, help='e.g. "gym", "fitness studio"')
    ap.add_argument("--location", required=True, help='e.g. "Austin, TX" or "78704"')
    ap.add_argument(
        "--radius", type=int, default=15000, help="search radius in meters (default 15000)"
    )
    ap.add_argument("--csv", help="write results to this CSV file")
    ap.add_argument("--max-pages", type=int, default=5, help="result pages (default 5)")
    args = ap.parse_args()

    api_key = os.environ.get("GOOGLE_MAPS_API_KEY")
    if not api_key:
        sys.exit("Set GOOGLE_MAPS_API_KEY in your environment first.")

    results = collect(args.query, args.location, args.radius, api_key, args.max_pages)
    rows = [to_row(p) for p in results]

    for r in rows:
        line = f"• {r['name']}"
        if r["phone"]:
            line += f" — {r['phone']}"
        if r["rating"]:
            line += f"  ({r['rating']}★ / {r['reviews']} reviews)"
        print(line)
        if r["address"]:
            print(f"    {r['address']}")

    if args.csv and rows:
        with open(args.csv, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
            w.writeheader()
            w.writerows(rows)
        print(f"\n💾 Wrote {len(rows)} leads to {args.csv}")


if __name__ == "__main__":
    main()
