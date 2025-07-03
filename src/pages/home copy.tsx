// src/pages/Home.tsx

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { SearchFilters } from '../components/SearchFilters';
import { SupplierGrid } from '../components/SupplierGrid';
import { useSuppliers } from '../hooks/useSuppliers';
import { SearchFilters as FilterType, Supplier } from '../types/supplier';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import marker icons
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Configure Leaflet’s default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

export default function Home() {
  const { filterSuppliers } = useSuppliers();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [filters, setFilters] = useState<FilterType>({
    query: '',
    state: '',
    city: '',
    woodTypes: [],
    maxDistance: 50,
    priceRange: { min: 100, max: 1000 },
    services: [],
    verifiedOnly: false,
  });

  const results = filterSuppliers(filters);

  // Build coordinates for map when filtering by location
  const coords: [number, number][] = results
    .map(s =>
      s.coordinates?.lat != null && s.coordinates?.lng != null
        ? [s.coordinates.lat, s.coordinates.lng] as [number, number]
        : null
    )
    .filter((c): c is [number, number] => c !== null);

  const center: [number, number] =
    coords.length > 0
      ? [
          coords.reduce((sum, c) => sum + c[0], 0) / coords.length,
          coords.reduce((sum, c) => sum + c[1], 0) / coords.length,
        ]
      : [37.0902, -95.7129]; // fallback to US center

  const title = filters.city
    ? filters.state
      ? `Suppliers in ${filters.city}, ${filters.state}`
      : `Suppliers in ${filters.city}`
    : filters.state
    ? `Suppliers in ${filters.state}`
    : 'Firewood Suppliers';

  const handleFiltersChange = (newFilters: FilterType) => {
    setFilters(newFilters);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchClick={() => setIsSearchOpen(true)} />

      {!showResults ? (
        <Hero onSearchClick={() => setIsSearchOpen(true)} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600 mt-1">
                {results.length} supplier{results.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
              type="button"
            >
              Refine Search
            </button>
          </div>

          {/* Map using OpenStreetMap Standard Tiles (same as StatePage) */}
          {(filters.city || filters.state) && coords.length > 0 && (
            <div className="h-80 rounded-lg overflow-hidden">
              <MapContainer center={center} zoom={filters.city ? 11 : 7} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {results.map(s =>
                  s.coordinates?.lat != null && s.coordinates?.lng != null ? (
                    <Marker key={s.id} position={[s.coordinates.lat, s.coordinates.lng]}>
                      <Popup>
                        <div className="space-y-1">
                          <strong>{s.businessName}</strong><br />
                          <span>
                            {s.address.city}, {s.address.state}
                          </span><br />
                          {s.phone && (
                            <a href={`tel:${s.phone}`} className="text-blue-600 hover:underline">
                              {s.phone}
                            </a>
                          )}<br />
                          <a href={`/supplier/${s.id}`} className="text-amber-600 hover:underline">
                            View Details
                          </a>
                        </div>
                      </Popup>
                    </Marker>
                  ) : null
                )}
              </MapContainer>
            </div>
          )}

          <SupplierGrid suppliers={results} />
        </div>
      )}

      <SearchFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        resultCount={results.length}
      />
    </div>
  );
}
