import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { SearchFilters } from '../types/supplier';

export const defaultFilters: SearchFilters = {
  query: '',
  state: '',
  city: '',
  woodTypes: [],
  maxDistance: 50,
  priceRange: { min: 100, max: 1000 },
  services: [],
  verifiedOnly: false,
};

interface FilterContextValue {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  showResults: boolean;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterContext = createContext<FilterContextValue>({
  filters: defaultFilters,
  setFilters: () => {},
  showResults: false,
  setShowResults: () => {},
});

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [showResults, setShowResults] = useState(false);

  return (
    <FilterContext.Provider value={{ filters, setFilters, showResults, setShowResults }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
