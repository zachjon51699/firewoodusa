// src/pages/StatePage.tsx

import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Map as LeafletMap } from 'leaflet';
import L from 'leaflet';
import { Header } from '../components/Header';
import { SearchFilters } from '../components/SearchFilters';
import { SupplierGrid } from '../components/SupplierGrid';
import { useSuppliers } from '../hooks/useSuppliers';
import type { SearchFilters as FilterType, Supplier } from '../types/supplier';
import 'leaflet/dist/leaflet.css';

// Leaflet marker icon setup
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

// Geographic centers for all 50 U.S. states
const stateCenters: Record<string, [number, number]> = {
  Alabama: [32.806671, -86.79113],
  Alaska: [61.370716, -152.404419],
  Arizona: [33.729759, -111.431221],
  Arkansas: [34.969704, -92.373123],
  California: [36.116203, -119.681564],
  Colorado: [39.059811, -105.311104],
  Connecticut: [41.597782, -72.755371],
  Delaware: [39.318523, -75.507141],
  Florida: [27.766279, -81.686783],
  Georgia: [33.040619, -83.643074],
  Hawaii: [21.094318, -157.498337],
  Idaho: [44.240459, -114.478828],
  Illinois: [40.349457, -88.986137],
  Indiana: [39.849426, -86.258278],
  Iowa: [42.011539, -93.210526],
  Kansas: [38.5266, -96.726486],
  Kentucky: [37.66814, -84.670067],
  Louisiana: [31.244823, -92.145024],
  Maine: [44.693947, -69.381927],
  Maryland: [39.063946, -76.802101],
  Massachusetts: [42.230171, -71.530106],
  Michigan: [43.326618, -84.536095],
  Minnesota: [45.694454, -93.900192],
  Mississippi: [32.741646, -89.678696],
  Missouri: [38.456085, -92.288368],
  Montana: [46.921925, -110.454353],
  Nebraska: [41.12537, -98.268082],
  Nevada: [38.313515, -117.055374],
  'New Hampshire': [43.452492, -71.563896],
  'New Jersey': [40.298904, -74.521011],
  'New Mexico': [34.840515, -106.248482],
  'New York': [42.165726, -74.948051],
  'North Carolina': [35.630066, -79.806419],
  'North Dakota': [47.528912, -99.784012],
  Ohio: [40.388783, -82.764915],
  Oklahoma: [35.565342, -96.928917],
  Oregon: [43.804133, -120.554201],
  Pennsylvania: [40.590752, -77.209755],
  'Rhode Island': [41.680893, -71.51178],
  'South Carolina': [33.856892, -80.945007],
  'South Dakota': [44.299782, -99.438828],
  Tennessee: [35.747845, -86.692345],
  Texas: [31.054487, -97.563461],
  Utah: [40.150032, -111.862434],
  Vermont: [44.045876, -72.710686],
  Virginia: [37.769337, -78.169968],
  Washington: [47.400902, -121.490494],
  'West Virginia': [38.491226, -80.954453],
  Wisconsin: [44.268543, -89.616508],
  Wyoming: [42.755966, -107.30249],
};

export default function StatePage() {
  const { state, city } = useParams<{ state: string; city?: string }>();
  const decodedState = decodeURIComponent(state || '').trim();
  const decodedCity = city ? decodeURIComponent(city).trim() : '';
  const { filterSuppliers } = useSuppliers();

  // Local filter state
  const [filters, setFilters] = useState<FilterType>({
    query: '',
    state: decodedState,
    city: decodedCity,
    woodTypes: [],
    maxDistance: 50,
    priceRange: { min: 0, max: 10000 },
    services: [],
    verifiedOnly: false,
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync URL params → filters
  useEffect(() => {
    setFilters(f => ({
      ...f,
      state: decodedState,
      city: decodedCity,
    }));
  }, [decodedState, decodedCity]);

  // Filter suppliers
  const results = filterSuppliers(filters);

  // Extract marker coordinates
  const coords: [number, number][] = results
    .map((s: Supplier) =>
      s.coordinates?.lat != null && s.coordinates?.lng != null
        ? [s.coordinates.lat, s.coordinates.lng]
        : null
    )
    .filter((c): c is [number, number] => c !== null);

  const mapRef = useRef<LeafletMap | null>(null);

  // Determine base center from our full list
  const stateKey = Object.keys(stateCenters).find(
    k => k.toLowerCase() === decodedState.toLowerCase()
  );
  const baseCenter: [number, number] = stateKey
    ? stateCenters[stateKey]
    : [37.0902, -95.7129]; // fallback: center of U.S.

  const stateZoom = 7;
  const cityZoom = 11;

  // Fit bounds for any coords; else fallback to state center
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (coords.length > 0) {
      map.fitBounds(L.latLngBounds(coords), { padding: [40, 40] });
      // zoom in a bit if only one marker
      if (coords.length === 1) {
        map.setZoom(cityZoom);
      }
    } else {
      map.setView(baseCenter, stateZoom);
    }
  }, [coords, baseCenter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchClick={() => setIsSearchOpen(true)} />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        {/* Navigation */}
        <div className="flex items-center space-x-6">
          <Link to="/home" className="text-blue-600 hover:underline">
            ← Home
          </Link>
          {decodedCity && (
            <Link
              to={`/state/${encodeURIComponent(decodedState)}`}
              className="text-blue-600 hover:underline"
            >
              ← All {decodedState}
            </Link>
          )}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-blue-600 hover:underline"
          >
            ← Refine Search
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900">
          Firewood For Sale in {' '}
          {decodedCity ? `${decodedCity}, ${decodedState}` : decodedState}
        </h1>
        <p className="text-gray-600 mb-4">
          {results.length} supplier{results.length !== 1 && 's'} found
        </p>

        {/* Map */}
        <div className="h-80 mb-8 rounded-lg overflow-hidden">
          <MapContainer
            key={`${decodedState}-${decodedCity}`}
            center={baseCenter}
            zoom={stateZoom}
            style={{ height: '100%', width: '100%' }}
            whenCreated={map => (mapRef.current = map)}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {coords.map((pos, idx) => (
              <Marker key={idx} position={pos}>
                <Popup>
                  <strong>{results[idx].businessName}</strong>
                  <br />
                  {results[idx].address.city}, {results[idx].address.state}
                  <br />
                  {results[idx].phone && (
                    <a
                      href={`tel:${results[idx].phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {results[idx].phone}
                    </a>
                  )}
                  <br />
                  <Link
                    to={`/supplier/${results[idx].id}`}
                    className="text-amber-600 hover:underline"
                  >
                    View Details
                  </Link>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Supplier Grid */}
        <SupplierGrid suppliers={results} />
      </div>

      {/* Refine Search */}
      <SearchFilters
        filters={filters}
        onFiltersChange={nf => setFilters(nf)}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        resultCount={results.length}
      />
    </div>
  );
}
