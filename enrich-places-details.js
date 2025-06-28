// enrich-places-details.js

import fs from 'fs/promises';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import fetch from 'node-fetch';

// — CONFIG —
// Your real API key goes here:
const API_KEY     = 'AIzaSyBihmxasoTVTYt8W7zti_LbnFeco7f091M';
// Only process parts 2–6; part 1 and its enriched output remain untouched.
const INPUT_CSVS  = [
  'firewood_directory_part_2.csv',
  'firewood_directory_part_3.csv',
  'firewood_directory_part_4.csv',
  'firewood_directory_part_5.csv',
  'firewood_directory_part_6.csv',
];
// Write to a new file so we don't overwrite part 1
const OUTPUT_CSV  = 'suppliers.part2-6.enriched.csv';
// ——————

async function lookupByText(query) {
  const endpoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
  const u = new URL(endpoint);
  u.searchParams.set('query', query);
  u.searchParams.set('key', API_KEY);

  const res  = await fetch(u.toString());
  const json = await res.json();
  if (json.status !== 'OK' || !json.results.length) return null;
  const p = json.results[0];
  return {
    rating:      p.rating            ?? 0,
    reviewCount: p.user_ratings_total ?? 0,
  };
}

async function main() {
  // 1) Load & combine CSV parts 2–6
  let allRows = [];
  for (const file of INPUT_CSVS) {
    console.log(`Loading ${file}…`);
    const raw  = await fs.readFile(file, 'utf-8');
    const rows = parse(raw, { columns: true, skip_empty_lines: true });
    allRows = allRows.concat(rows);
  }
  console.log(`Total suppliers to enrich (parts 2–6): ${allRows.length}`);

  // 2) Enrich every supplier
  const enriched = [];
  for (const [i, row] of allRows.entries()) {
    const query = `${row.name} ${row.full_address}`;
    process.stdout.write(`(${i+1}/${allRows.length}) Searching: ${query} … `);

    let info = null;
    try {
      info = await lookupByText(query);
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }

    row.rating      = info?.rating      ?? '';
    row.reviewCount = info?.reviewCount ?? '';

    enriched.push(row);
    process.stdout.write(info ? `✔ ${row.rating}⭐ (${row.reviewCount})\n` : `✖ no match\n`);

    // brief throttle
    await new Promise(r => setTimeout(r, 200));
  }

  // 3) Write out to a new file
  console.log(`Writing ${OUTPUT_CSV}…`);
  const out = stringify(enriched, { header: true });
  await fs.writeFile(OUTPUT_CSV, out, 'utf-8');
  console.log(`✅ Done! ${OUTPUT_CSV} contains ${enriched.length} suppliers with ratings.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
