// src/components/SupplierGrid.tsx

import React from 'react';
import type { Supplier } from '../types/supplier';
import { SupplierCard } from './SupplierCard';

interface SupplierGridProps {
  suppliers: Supplier[];
}

export const SupplierGrid: React.FC<SupplierGridProps> = ({ suppliers }) => {
  if (!suppliers.length) {
    return <p className="p-4">No suppliers to display</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {suppliers.map(s => (
        <SupplierCard key={s.id} supplier={s} />
      ))}
    </div>
  );
};
