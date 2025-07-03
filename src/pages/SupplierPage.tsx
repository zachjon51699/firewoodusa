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

  const from = location.state?.from;

  const backToAll = () => {
    window.location.href = '/home';
  };

  if (!suppliers.length) {
    return <p className="p-8 text-center">Loading…</p>;
  }

  const supplier = suppliers.find((s) => {
    if (!s.businessName) return false;

    const slug = s.businessName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');

    return slug === id || String(s.id) === id;
  });

  if (!supplier) {
    return (
      <div className="p-8">
        <button
          onClick={() => (from ? navigate(from) : navigate(-1))}
          className="mr-4 text-blue-600 hover:underline"
        >
          ← Back to Results
        </button>
        <button
          onClick={backToAll}
          className="text-blue-600 hover:underline"
        >
          ← Back to All Suppliers
        </button>
        <p className="mt-4">Supplier not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SupplierDetail
        supplier={supplier}
        onClose={() => (from ? navigate(from) : navigate(-1))}
      />
    </div>
  );
}
