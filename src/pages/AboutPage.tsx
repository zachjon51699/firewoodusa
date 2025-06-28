// src/pages/AboutPage.tsx

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { SearchFilters } from '../components/SearchFilters';
import { useFilterContext } from '../context/FilterContext';
import { CheckCircle, Globe, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { filters, setFilters, showResults, setShowResults } = useFilterContext();

  return (
    <div className="min-h-screen bg-amber-50">
      <Header onSearchClick={() => setIsSearchOpen(true)} />

      {/* Hero / Title */}
      <div className="py-16 text-center">
        <h1 className="text-6xl font-extrabold text-gray-900">
          About{' '}
          <span className="text-amber-600">
            FirewoodUSA
          </span>
        </h1>
      </div>

      {/* Description */}
      <div className="max-w-3xl mx-auto px-6 pb-12 space-y-6">
        <p className="text-gray-700">
          FirewoodUSA Directory connects you with trusted local firewood suppliers nationwide.
          Our platform helps you find seasoned hardwoods, kiln-dried pine, and custom bundles
          with ease.
        </p>
        <p className="text-gray-700">
          We know how important it is to follow federal and state regulations when transporting
          firewood—to protect forests from invasive pests and diseases. That’s why all suppliers
          in our directory adhere to best practices for sourcing, processing, and shipping.
        </p>
        <p className="text-gray-700">
          Whether you’re a homeowner, camper, or business, FirewoodUSA gives you the tools to
          compare suppliers, pricing, and services—all in one place.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Verified Suppliers */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <CheckCircle className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Verified Suppliers
            </h3>
            <p className="text-gray-600 text-center">
              Every business is vetted for quality and compliance, so you can buy with confidence.
            </p>
          </div>

          {/* Nationwide Reach */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Nationwide Reach
            </h3>
            <p className="text-gray-600 text-center">
              Find suppliers in every state, with flexible shipping and local pickup options.
            </p>
          </div>

          {/* Compliance & Safety */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Compliance & Safety
            </h3>
            <p className="text-gray-600 text-center">
              Suppliers follow best practices and regulations to protect forests and ensure safe transport.
            </p>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchFilters
        filters={filters}
        onFiltersChange={newFilters => {
          setFilters(newFilters);
          setShowResults(true);
          setIsSearchOpen(false);
        }}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        resultCount={0}
      />
    </div>
  );
}
