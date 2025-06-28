// merge-json-ratings.js

import fs from 'fs/promises';
import { parse } from 'csv-parse/sync';

const CSV_PARTS     = [
  'suppliers.part1.enriched.csv',
  'suppliers.part2-6.enriched.csv'
];
const JSON_INPUT    = 'public/data/listings.json';
const OUTPUT_MERGED = 'listings.merged.json';

async function main() {
  // 1) Load your current JSON
  console.log(`Loading JSON from ${JSON_INPUT}`);
  const rawJson = await fs.readFile(JSON_INPUT, 'utf8');
  const listings = JSON.parse(rawJson);

  // 2) Load & concatenate enriched CSV rows
  let enriched = [];
  for (const file of CSV_PARTS) {
    console.log(`Reading CSV: ${file}`);
    const rawCsv = await fs.readFile(file, 'utf8');
    const rows = parse(rawCsv, { columns: true, skip_empty_lines: true });
    enriched = enriched.concat(rows);
  }
  console.log(`Loaded ${enriched.length} total CSV rows`);

  // 3) Build lookup on name + postal_code
  const lookup = {};
  enriched.forEach(r => {
    const nameKey = (r.name || '').trim().toLowerCase();
    const zipKey  = (r.postal_code || r.postalCode || '').trim();
    lookup[`${nameKey}||${zipKey}`] = {
      rating:      r.rating      === '' ? null : Number(r.rating),
      reviewCount: r.reviewCount === '' ? null : Number(r.reviewCount)
    };
  });
  console.log(`Built lookup entries: ${Object.keys(lookup).length}`);

  // 4) Merge into your JSON
  const merged = listings.map(item => {
    const nameKey = (item.businessName || '').trim().toLowerCase();
    const zipKey  = (item.address?.zipCode || '').trim();
    const key     = `${nameKey}||${zipKey}`;
    const info    = lookup[key];
    if (info) {
      return {
        ...item,
        rating:      info.rating      ?? item.rating      ?? null,
        reviewCount: info.reviewCount ?? item.reviewCount ?? null
      };
    }
    return item;
  });
  console.log(`Merged ratings into ${merged.length} listings`);

  // 5) Write it out to the project root
  await fs.writeFile(OUTPUT_MERGED, JSON.stringify(merged, null, 2), 'utf8');
  console.log(`✅ Wrote merged file: ${OUTPUT_MERGED}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
