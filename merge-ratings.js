// merge-ratings.js

import fs from 'fs/promises';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

// Paths—adjust if yours differ:
const LISTINGS_CSV     = 'public/data/listings.csv';             // your original data
const ENRICHED_FILES   = [
  'suppliers.part1.enriched.csv',
  'suppliers.part2-6.enriched.csv'
];
const OUTPUT_CSV       = 'public/data/listings.with-ratings.csv';  // merged output

async function main() {
  // 1) Load original listings
  const rawListings = await fs.readFile(LISTINGS_CSV, 'utf-8');
  const listings    = parse(rawListings, { columns: true, skip_empty_lines: true });

  // 2) Load all enriched parts into one array
  let enrichedAll = [];
  for (const file of ENRICHED_FILES) {
    console.log(`Loading enriched data from ${file}…`);
    const raw = await fs.readFile(file, 'utf-8');
    const rows = parse(raw, { columns: true, skip_empty_lines: true });
    enrichedAll = enrichedAll.concat(rows);
  }

  // 3) Build lookup by name + full_address
  const lookup = {};
  for (const row of enrichedAll) {
    const key = `${row.name}||${row.full_address}`.toLowerCase();
    lookup[key] = { rating: row.rating, reviewCount: row.reviewCount };
  }

  // 4) Merge into listings
  const merged = listings.map(row => {
    const key = `${row.name}||${row.full_address}`.toLowerCase();
    const info = lookup[key] || { rating: '', reviewCount: '' };
    return {
      ...row,
      rating:      info.rating,
      reviewCount: info.reviewCount
    };
  });

  // 5) Write out to a new file
  const out = stringify(merged, { header: true });
  await fs.writeFile(OUTPUT_CSV, out, 'utf-8');
  console.log(`✅ Written ${OUTPUT_CSV} with rating & reviewCount merged.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
