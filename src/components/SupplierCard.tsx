// src/components/SupplierCard.tsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Star, CheckCircle, Truck, DollarSign } from 'lucide-react';
import type { Supplier } from '../types/supplier';

interface SupplierCardProps {
  supplier: Supplier;
}

export const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {
  const location = useLocation();
  const from = location.pathname + (location.search || '');

  // Generate slug from business name
  const slug = supplier.businessName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Dynamic description
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
    <Link
      to={`/supplier/${slug}`}
      state={{ from }}
      className="block"
    >
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200 overflow-hidden">
        {supplier.imageUrl && (
          <div className="h-48 bg-gray-200 overflow-hidden">
            <img
              src={supplier.imageUrl}
              alt={supplier.businessName}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <span>{supplier.businessName}</span>
              {supplier.isVerified && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </h3>
            <div className="flex items-center space-x-1 text-sm">
              {supplier.rating !== '' && supplier.rating >= 0 ? (
                <>
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-gray-600">{supplier.rating.toFixed(1)}</span>
                  <span className="text-gray-400">({supplier.reviewCount})</span>
                </>
              ) : (
                <span className="text-gray-400">No reviews</span>
              )}
            </div>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {supplier.address.city}, {supplier.address.state}
            </span>
          </div>
          <div className="flex items-center text-gray-600 mb-3">
            <Phone className="h-4 w-4 mr-1" />
            <span className="text-sm">{supplier.phone}</span>
          </div>

          {/* Updated dynamic description */}
          <p className="text-gray-600 text-sm mb-4">{description}</p>

          <div className="mb-4">
            <div className="flex flex-wrap gap-1 mb-2">
              {supplier.woodTypes.slice(0, 3).map(type => (
                <span
                  key={type}
                  className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs"
                >
                  {type}
                </span>
              ))}
              {supplier.woodTypes.length > 3 && (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  +{supplier.woodTypes.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-4">
            <div className="flex items-center text-green-600">
              <Truck className="h-4 w-4 mr-1" />
              {supplier.deliveryRadius && supplier.deliveryRadius > 0 ? (
                <span>{supplier.deliveryRadius} mile radius</span>
              ) : (
                <span>Delivery radius not listed</span>
              )}
            </div>
            <div className="flex items-center text-gray-900 font-semibold">
              <DollarSign className="h-4 w-4 mr-1" />
              {supplier.pricing?.cordPrice && supplier.pricing.cordPrice > 0 ? (
                <span>${supplier.pricing.cordPrice}/cord</span>
              ) : (
                <span>Call for pricing</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
