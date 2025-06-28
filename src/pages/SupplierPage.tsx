// src/pages/SupplierPage.tsx

import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSuppliers } from '../hooks/useSuppliers';
import { SupplierDetail } from '../components/SupplierDetail';

type LocationState = { from?: string };

export default function SupplierPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation<LocationState>();
  const { suppliers } = useSuppliers();

  // If the card passed you a from, use that; otherwise fall back to history
  const from = location.state?.from;

  // Button to return to the unfiltered home page
  const backToAll = () => {
    // full reload to clear everything
    window.location.href = '/home';
  };

  if (!suppliers.length) {
    return <p className="p-8 text-center">Loading…</p>;
  }

  const supplier = suppliers.find(s => s.id === id);

  if (!supplier) {
    return (
      <div className="p-8">
        <button
          onClick={() => (from ? navigate(from) : navigate(-1))}
          className="mr-4 text-blue-600 hover:underline"
        >
          ← Back to Results
        </button>
        <button onClick={backToAll} className="text-blue-600 hover:underline">
          ← Back to All Suppliers
        </button>
        <p className="mt-4">Supplier not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => (from ? navigate(from) : navigate(-1))}
          className="text-blue-600 hover:underline"
        >
          ← Back to Results
        </button>
        <button onClick={backToAll} className="text-blue-600 hover:underline">
          ← Back to All Suppliers
        </button>
      </div>
      <SupplierDetail
        supplier={supplier}
        onClose={() => (from ? navigate(from) : navigate(-1))}
      />
    </div>
  );
}
