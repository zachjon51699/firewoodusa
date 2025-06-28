// src/components/SupplierDetail.tsx

import React from 'react';
import {
  X,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  CheckCircle,
  Truck,
  Calendar,
  Facebook,
  Instagram,
} from 'lucide-react';
import { Supplier } from '../types/supplier';

interface SupplierDetailProps {
  supplier: Supplier;
  onClose: () => void;
}

export const SupplierDetail: React.FC<SupplierDetailProps> = ({
  supplier,
  onClose,
}) => {
  // Safely fallback arrays
  const woodTypes = supplier.woodTypes ?? [];
  const services = supplier.services ?? [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Image & Close Button */}
        <div className="relative">
          {supplier.imageUrl && (
            <div className="h-64 bg-gray-200 overflow-hidden rounded-t-lg">
              <img
                src={supplier.imageUrl}
                alt={supplier.businessName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-600 hover:text-gray-800 p-2 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Header with Rating */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2 mb-2">
                <span>{supplier.businessName}</span>
                {supplier.isVerified && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
              </h1>
              {supplier.ownerName && (
                <p className="text-lg text-gray-600">
                  Owned by {supplier.ownerName}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2 text-lg">
              {supplier.rating !== '' && supplier.rating >= 0 ? (
                <>
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">
                    {supplier.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-500">
                    ({supplier.reviewCount} reviews)
                  </span>
                </>
              ) : (
                <span className="text-gray-500">No reviews yet</span>
              )}
            </div>
          </div>

          {/* Two-column info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column: Contact & Business Info */}
            <div className="space-y-6">
              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3" />
                    <div>
                      <div>{supplier.address.street}</div>
                      <div>
                        {supplier.address.city}, {supplier.address.state}{' '}
                        {supplier.address.zipCode}
                      </div>
                    </div>
                  </div>
                  {supplier.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-5 w-5 mr-3" />
                      <a href={`tel:${supplier.phone}`} className="hover:underline">
                        {supplier.phone}
                      </a>
                    </div>
                  )}
                  {supplier.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-5 w-5 mr-3" />
                      <a
                        href={`mailto:${supplier.email}`}
                        className="hover:underline"
                      >
                        {supplier.email}
                      </a>
                    </div>
                  )}
                  {supplier.website && (
                    <div className="flex items-center text-gray-600">
                      <Globe className="h-5 w-5 mr-3" />
                      <a
                        href={supplier.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:text-amber-700 transition-colors"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Business */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Business Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3" />
                    <span>Established {supplier.established ?? 'N/A'}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Truck className="h-5 w-5 mr-3" />
                    <span>
                      Delivers within {supplier.deliveryRadius ?? 0} miles
                    </span>
                  </div>
                </div>
                {supplier.businessDescription && (
                  <p className="text-gray-600 mt-3">
                    {supplier.businessDescription}
                  </p>
                )}
              </div>

              {/* Social Media */}
              {supplier.socialMedia && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Social Media
                  </h3>
                  <div className="flex space-x-4">
                    {supplier.socialMedia.facebook && (
                      <a
                        href={supplier.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Facebook className="h-5 w-5" />
                        <span>Facebook</span>
                      </a>
                    )}
                    {supplier.socialMedia.instagram && (
                      <a
                        href={supplier.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 transition-colors"
                      >
                        <Instagram className="h-5 w-5" />
                        <span>Instagram</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right column: Wood, Services, Pricing */}
            <div className="space-y-6">
              {/* Wood Types */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Wood Types Available
                </h3>
                <div className="flex flex-wrap gap-2">
                  {woodTypes.map((type) => (
                    <span
                      key={type}
                      className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Services Offered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => (
                    <span
                      key={service}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Pricing
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Full Cord</span>
                    <span className="font-semibold text-gray-900">
                      ${supplier.pricing.cordPrice ?? 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Half Cord</span>
                    <span className="font-semibold text-gray-900">
                      ${supplier.pricing.halfCordPrice ?? 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Face Chord</span>
                    <span className="font-semibold text-gray-900">
                      ${supplier.pricing.faceChordPrice ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
