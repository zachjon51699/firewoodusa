// src/components/SupplierDetail.tsx

import React from 'react';
import { MapPin, Phone, Mail, Globe, Star, CheckCircle, Truck, DollarSign } from 'lucide-react';
import type { Supplier } from '../types/supplier';
import { Header } from './Header';

interface SupplierDetailProps {
  supplier: Supplier;
  onClose: () => void;
}

export const SupplierDetail: React.FC<SupplierDetailProps> = ({ supplier, onClose }) => {
  const googleMapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    `${supplier.address.street}, ${supplier.address.city}, ${supplier.address.state} ${supplier.address.zip}`
  )}&output=embed`;

  const description = `${supplier.businessName} provides firewood in ${supplier.address.city}, ${supplier.address.state}.` +
    `${supplier.woodTypes.length > 0 ? ` They offer popular wood types like ${supplier.woodTypes.slice(0, 2).join(' and ')}.` : ''}` +
    `${supplier.deliveryRadius && supplier.deliveryRadius > 0
      ? ` Delivery is available within ${supplier.deliveryRadius} miles.`
      : ' Delivery is currently not available.'}` +
    `${supplier.pricing?.cordPrice && supplier.pricing.cordPrice > 0
      ? ` Pricing starts at $${supplier.pricing.cordPrice} per cord.`
      : ' Call for current pricing and availability.'}` +
    `${supplier.isVerified ? ' This supplier is verified for quality service.' : ''}`;

  return (
    <>
      <Header onSearchClick={() => {}} />

      {/* Back buttons */}
      <div className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex gap-4">
          <button
            onClick={() => onClose()}
            className="text-blue-600 hover:underline"
          >
            ← Back to Results
          </button>
          <button
            onClick={() => (window.location.href = '/home')}
            className="text-blue-600 hover:underline"
          >
            ← Back to All Suppliers
          </button>
        </div>
      </div>

      {/* Main Supplier Details */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <span>{supplier.businessName}</span>
              {supplier.isVerified && <CheckCircle className="h-6 w-6 text-green-500" />}
            </h2>
            <div className="flex items-center text-sm space-x-2 mt-2 sm:mt-0">
              {supplier.rating !== '' && supplier.rating >= 0 ? (
                <>
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-gray-600">{supplier.rating.toFixed(1)}</span>
                  <span className="text-gray-400">({supplier.reviewCount} reviews)</span>
                </>
              ) : (
                <span className="text-gray-400">No reviews</span>
              )}
            </div>
          </div>

          {supplier.imageUrl && (
            <div className="mb-4 h-64 overflow-hidden rounded">
              <img
                src={supplier.imageUrl}
                alt={supplier.businessName}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Updated dynamic description */}
          <p className="text-gray-700 mb-4">{description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-3" />
              <span>
                {supplier.address.street}, {supplier.address.city}, {supplier.address.state} {supplier.address.zip}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="h-5 w-5 mr-3" />
              <span>{supplier.phone}</span>
            </div>
            {supplier.email && (
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-3" />
                <span>{supplier.email}</span>
              </div>
            )}
            {supplier.website && (
              <div className="flex items-center text-gray-600">
                <Globe className="h-5 w-5 mr-3" />
                <a
                  href={supplier.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {supplier.website}
                </a>
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <Truck className="h-5 w-5 mr-3" />
              {supplier.deliveryRadius && supplier.deliveryRadius > 0 ? (
                <span>{supplier.deliveryRadius} mile delivery radius</span>
              ) : (
                <span>Delivery radius not listed</span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Wood Types Offered</h3>
            <div className="flex flex-wrap gap-2">
              {supplier.woodTypes.map((type) => (
                <span
                  key={type}
                  className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Pricing</h3>
            <div className="flex items-center text-gray-800 space-x-2">
              <DollarSign className="h-5 w-5" />
              {supplier.pricing?.cordPrice && supplier.pricing.cordPrice > 0 ? (
                <span>${supplier.pricing.cordPrice} per cord</span>
              ) : (
                <span>Call for pricing</span>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Location Map</h3>
            <div className="rounded overflow-hidden border shadow-sm">
              <iframe
                title="Supplier Location"
                src={googleMapUrl}
                width="100%"
                height="300"
                loading="lazy"
                allowFullScreen
                className="rounded"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
