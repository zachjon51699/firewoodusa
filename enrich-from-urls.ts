// enrich-from-urls.js
import 'dotenv/config';
import fs from 'fs/promises';
import csvParse from 'csv-parse/lib/sync';
import fetch from 'node-fetch';
import stringify from 'csv-stringify/lib/sync';

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!API_KEY) {
  console.error('❌ Missing GOOGLE_PLACES_API_KEY in your .env');
  process.exit(1);
}

// 1) Extract place_id from Google Maps URL
function extractPlaceId(url) {
  const m = url.match(/place_id:([A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
}

// 2) Fetch rating & review count from Places Details API
async function getPlaceDetails(placeId) {
  const endpoint = 'https://maps.googleapis.com/maps/api/place/details/json';
  const url = new URL(endpoint);
  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', 'rating,user_ratings_total');
  url.searchParams.set('key', API_KEY);

  const res = await fetch(url.toString());
  const json = await res.json();
  if (json.status !== 'OK') return null;
  return {
    rating: json.result.rating ?? 0,
    reviewCount: json.result.user_ratings_total ?? 0,
  };
}

async function main() {
  // Read your CSV
  const raw = await fs.readFile('your-suppliers.csv', 'utf-8');
  const rows = csvParse(raw, { columns: true, skip_empty_lines: true });

  const enriched = [];

  for (const row of rows) {
    const link = row.location_link;
    const placeId = extractPlaceId(link);
    if (!placeId) {
      row.rating = '';
      row.reviewCount = '';
    } else {
      const info = await getPlaceDetails(placeId);
      if (info) {
        row.rating = info.rating;
        row.reviewCount = info.reviewCount;
      } else {
        row.rating = '';
        row.reviewCount = '';
      }
    }
    enriched.push(row);
    // throttle to avoid quota issues
    await new Promise(r => setTimeout(r, 100));
  }

  // Write out enriched CSV
  const output = stringify(enriched, { header: true });
  await fs.writeFile('suppliers.enriched.csv', output, 'utf-8');
  console.log(`✅ Written suppliers.enriched.csv with rating & reviewCount columns.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
