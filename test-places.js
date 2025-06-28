// test-places.js
import 'dotenv/config';
import fetch from 'node-fetch';

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!API_KEY) {
  console.error('❌  Please set GOOGLE_PLACES_API_KEY in your env');
  process.exit(1);
}

async function lookupByText(name, location) {
  // Use Text Search: name + city, state (location)
  const query = `${name} ${location}`;
  const url =
    `https://maps.googleapis.com/maps/api/place/textsearch/json?` +
    `query=${encodeURIComponent(query)}` +
    `&key=${API_KEY}`;

  const res = await fetch(url);
  const json = await res.json();
  if (json.status !== 'OK' || !json.results.length) {
    console.warn(`⚠️ No TextSearch match for "${query}" (${json.status})`);
    return null;
  }
  const place = json.results[0];
  return {
    rating: place.rating || 0,
    reviews: place.user_ratings_total || 0,
    placeId: place.place_id,
    address: place.formatted_address,
  };
}

async function testSupplier(s) {
  console.log(`\n🔍  ${s.name} — ${s.city}, ${s.state}`);
  const info = await lookupByText(s.name, `${s.city}, ${s.state}`);
  if (!info) {
    console.log('   ✖ no match found');
  } else {
    console.log(`   ✅ rating=${info.rating}, reviews=${info.reviews}`);
    console.log(
      `     https://www.google.com/maps/place/?q=place_id:${info.placeId}`
    );
    console.log(`     Address: ${info.address}`);
  }
}

(async () => {
  const tests = [
    { name: 'Solid Woodworks Inc', city: 'Foley', state: 'AL' },
    { name: 'Clear Creek Wood Products', city: 'Nauvoo', state: 'AL' },
    { name: 'Northriver Firewood', city: 'Tuscaloosa', state: 'AL' },
  ];

  for (const s of tests) {
    await testSupplier(s);
  }
})();
