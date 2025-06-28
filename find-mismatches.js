// find-mismatches.js

import fs from 'fs/promises';
import { parse } from 'csv-parse/sync';

const JSON_PATH = 'public/data/listings.json';
const CSV_PARTS = [
  'suppliers.part1.enriched.csv',
  'suppliers.part2-6.enriched.csv'
];

async function main() {
  const rawJson = await fs.readFile(JSON_PATH, 'utf8');
  const listings = JSON.parse(rawJson);

  const lookup = new Set();
  for (const file of CSV_PARTS) {
    const rawCsv = await fs.readFile(file, 'utf8');
    const rows = parse(rawCsv, { columns: true, skip_empty_lines: true });
    for (const r of rows) {
      const key = `${(r.businessName||'').trim().toLowerCase()}||${(r.full_address||'').trim().toLowerCase()}`;
      lookup.add(key);
    }
  }

  const mismatches = listings.filter(item => {
    const key = `${(item.businessName||'').trim().toLowerCase()}||${(item.full_address||'').trim().toLowerCase()}`;
    return !lookup.has(key);
  });

  console.log(`Total listings: ${listings.length}`);
  console.log(`Unmatched listings: ${mismatches.length}\n`);
  mismatches.slice(0,20).forEach((m,i) => {
    console.log(`${i+1}. "${m.businessName}" | "${m.full_address}"`);
  });
  if (mismatches.length > 20) {
    console.log(`\nand ${mismatches.length-20} more…`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
