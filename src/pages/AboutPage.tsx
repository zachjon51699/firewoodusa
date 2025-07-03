import React, { useState } from 'react';
import { Header } from '../components/Header';
import { SearchFilters } from '../components/SearchFilters';
import { useFilterContext } from '../context/FilterContext';

export default function AboutPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { filters, setFilters, showResults, setShowResults } = useFilterContext();

  return (
    <div className="min-h-screen bg-amber-50">
      <Header onSearchClick={() => setIsSearchOpen(true)} />

      <div className="py-16 text-center">
        <h1 className="text-6xl font-extrabold text-gray-900">
          About <span className="text-amber-600">FirewoodUSA</span>
        </h1>
        <p className="text-xl text-gray-700 mt-4 max-w-2xl mx-auto">
          Your go-to firewood directory for finding firewood for sale near me, delivery options, and trusted local suppliers.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-12 space-y-6">
        <p className="text-lg text-gray-700">
          FirewoodUSA is the #1 online firewood directory that connects homeowners, campers, and businesses with trusted firewood suppliers near you. Whether you're searching for seasoned firewood, kiln-dried bundles, or bulk firewood delivery, we make it easy to find what you need—fast.
        </p>
        <p className="text-lg text-gray-700">
          We promote safe, responsible sourcing and highlight suppliers that comply with state and federal transport regulations to protect forests from invasive pests.
        </p>
        <p className="text-lg text-gray-700">
          Planning a winter fire, a camping trip, or buying in bulk? Use FirewoodUSA to browse suppliers by state, compare pricing, see verified reviews, and contact local businesses that offer delivery or pickup near you.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
          Why Choose FirewoodUSA?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl mb-4">🔥</div>
            <h3 className="text-xl font-semibold mb-2">Nationwide Coverage</h3>
            <p className="text-gray-600">Browse over 3,800 firewood suppliers in all 50 states. Whether you need firewood delivery near me or local pickup, we’ve got you covered.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl mb-4">🌲</div>
            <h3 className="text-xl font-semibold mb-2">Safe & Sustainable</h3>
            <p className="text-gray-600">We promote responsible firewood transport and encourage suppliers to follow environmental guidelines to protect forests and wildlife.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl mb-4">🪵</div>
            <h3 className="text-xl font-semibold mb-2">Transparent Listings</h3>
            <p className="text-gray-600">Compare firewood types, delivery services, prices, and read verified reviews before choosing your supplier.</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
          Who Benefits from Using FirewoodUSA?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-amber-100 p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Homeowners & Campers</h3>
            <p className="text-gray-700">Quickly compare firewood prices near you, delivery times, and wood species like oak, pine, and hickory.</p>
          </div>
          <div className="bg-amber-100 p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Local Businesses</h3>
            <p className="text-gray-700">Source bulk firewood or commercial firewood delivery options for restaurants, markets, and resorts.</p>
          </div>
          <div className="bg-amber-100 p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Landscapers & Property Managers</h3>
            <p className="text-gray-700">Find nearby suppliers with delivery and stacking services to keep your clients’ properties stocked and ready.</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
          Frequently Asked Questions About Firewood Near Me
        </h2>
        <div className="space-y-6">
          <details className="bg-white shadow-md rounded-lg p-5 group">
            <summary className="cursor-pointer text-lg font-medium text-gray-800 group-open:text-amber-600">
              How can I find firewood for sale near me?
            </summary>
            <p className="mt-2 text-gray-700">
              Use our [<a href="/" className="text-amber-600 hover:underline">firewood directory</a>] to search by city, state, or ZIP code. Filter by wood type, delivery availability, and verified reviews.
            </p>
          </details>

          <details className="bg-white shadow-md rounded-lg p-5 group">
            <summary className="cursor-pointer text-lg font-medium text-gray-800 group-open:text-amber-600">
              Is there a difference between seasoned and kiln-dried firewood?
            </summary>
            <p className="mt-2 text-gray-700">
              Yes. Seasoned firewood is air-dried over months, while kiln-dried firewood is oven-dried to ensure low moisture levels. Kiln-dried burns hotter and cleaner.
            </p>
          </details>

          <details className="bg-white shadow-md rounded-lg p-5 group">
            <summary className="cursor-pointer text-lg font-medium text-gray-800 group-open:text-amber-600">
              Can I get firewood delivered to my house?
            </summary>
            <p className="mt-2 text-gray-700">
              Most suppliers offer home delivery. Use our filters to find listings that include firewood delivery near you with stacking options.
            </p>
          </details>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-16 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Get Firewood Tips & Local Deals
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Subscribe to our newsletter for seasonal tips, supplier reviews, and exclusive firewood deals in your area.
        </p>
        <form
          action="mailto:help@findfirewoodusa.com"
          method="POST"
          encType="text/plain"
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="px-4 py-2 w-full sm:w-80 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white font-semibold rounded-md hover:bg-amber-700 transition"
          >
            Subscribe
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4">
          We respect your inbox. Unsubscribe at any time.
        </p>
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
