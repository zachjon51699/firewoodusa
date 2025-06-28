// src/components/SearchFilters.tsx

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import type { SearchFilters as FilterType } from '../types/supplier';

interface SearchFiltersProps {
  filters: FilterType;
  onFiltersChange: (newFilters: FilterType) => void;
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
}

export function SearchFilters({
  filters,
  onFiltersChange,
  isOpen,
  onClose,
  resultCount,
}: SearchFiltersProps) {
  const [local, setLocal] = useState<FilterType>(filters);
  const navigate = useNavigate();

  useEffect(() => {
    setLocal(filters);
  }, [filters]);

  const apply = () => {
    onClose();

    // both state + city => /state/:state/:city
    if (local.state && local.city) {
      navigate(
        `/state/${encodeURIComponent(local.state)}/${encodeURIComponent(local.city)}`
      );
      return;
    }

    // only state => /state/:state
    if (local.state) {
      navigate(`/state/${encodeURIComponent(local.state)}`);
      return;
    }

    // no state => home with filters
    onFiltersChange(local);
    navigate('/home', { replace: true });
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="relative z-[10000] bg-white rounded-lg max-w-md w-full p-6 space-y-4">
        <h2 className="text-xl font-semibold">Refine Search</h2>

        {/* State */}
        <div>
          <label htmlFor="state" className="block text-gray-700 mb-1">State</label>
          <input
            id="state"
            type="text"
            value={local.state}
            onChange={e => setLocal(f => ({ ...f, state: e.target.value }))}
            placeholder="e.g. Alabama"
            className="w-full border-gray-300 rounded p-2 border"
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-gray-700 mb-1">City</label>
          <input
            id="city"
            type="text"
            value={local.city}
            onChange={e => setLocal(f => ({ ...f, city: e.target.value }))}
            placeholder="e.g. Birmingham"
            className="w-full border-gray-300 rounded p-2 border"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={apply}
            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
          >
            Apply
          </button>
        </div>

        <p className="text-sm text-gray-600">
          {resultCount} supplier{resultCount !== 1 ? 's' : ''} found
        </p>
      </div>
    </div>,
    document.body
  );
}
