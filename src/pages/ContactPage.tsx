// src/pages/ContactPage.tsx

import React, { useState, FormEvent } from 'react';
import { Header } from '../components/Header';
import { SearchFilters } from '../components/SearchFilters';
import { useFilterContext } from '../context/FilterContext';

export default function ContactPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { filters, setFilters, showResults, setShowResults } = useFilterContext();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app you'd send this to your backend.
    console.log('Supplier inquiry:', { name, email });
    setSubmitted(true);
    setName('');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <Header onSearchClick={() => setIsSearchOpen(true)} />

      {/* Hero */}
      <div className="py-16 text-center">
        <h1 className="text-6xl font-extrabold text-gray-900">
          Contact Us
        </h1>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Have questions or need support? Reach out or, if you’re a firewood supplier, let us know and we’ll add you!
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pb-12 space-y-8">
        {/* Support Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">General Inquiries</h2>
          <p className="text-gray-700">
            Email: <a href="mailto:info@firewoodusa.com" className="text-amber-600 hover:underline">info@findfirewoodusa.com</a><br/>
            Phone: <a href="tel:5551234567" className="text-amber-600 hover:underline">(555) 123-4567</a>
          </p>
        </div>

        {/* Supplier Signup Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Supplier Signup</h2>
          {submitted ? (
            <p className="text-green-600">Thank you! We’ll be in touch shortly.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <button
                type="submit"
                className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>

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
