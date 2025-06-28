// src/hooks/useSuppliers.ts

import { useState, useEffect } from 'react';
import type { Supplier, SearchFilters } from '../types/supplier';

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  // Load once on mount
  useEffect(() => {
    fetch('/data/listings.json')
      .then(res => res.json())
      .then((data: Supplier[]) => setSuppliers(data))
      .catch(console.error);
  }, []);

  function filterSuppliers(filters: SearchFilters): Supplier[] {
    return suppliers.filter(s => {
      // State filter
      if (filters.state && s.address.state.toLowerCase() !== filters.state.toLowerCase()) {
        return false;
      }
      // City filter
      if (filters.city && s.address.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }
      return true;
    });
  }

  return { suppliers, filterSuppliers };
}
