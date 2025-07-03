import React, { useState } from 'react';
import { Header } from '../components/Header';
import { SearchFilters } from '../components/SearchFilters';
import { useFilterContext } from '../context/FilterContext';

const products = [
  {
    category: 'Fire Pits',
    name: 'Solo Stove Bonfire 2.0',
    description: 'Smokeless fire pit perfect for backyard gatherings.',
    image: 'https://content.solostove.com/image/upload/c_fill,h_405,w_405/f_auto/dpr_auto/q_auto/v1/transform/f22a2eb2-e266-488c-89c9-37094c5e4b0c/BONFIRE-BACKYARD-BUNDLE_SS_1',
    url: 'https://www.solostove.com/en-us/p/bonfire-plus-stand',
  },
  {
    category: 'Fire Pits',
    name: 'Breeo X Series 19',
    description: 'Durable smokeless fire pit with optional sear plate.',
    image: 'https://breeo.com/cdn/shop/files/WB_1021_Fire_Pit_Comparison_1x1_2_2f0919e7-da8c-48d3-82de-7c80a9465980.jpg?v=1729715784',
    url: 'https://breeo.com/products/x-series-smokeless-fire-pit?variant=41234257903661&country=US&currency=USD&utm_source=chatgpt.com',
  },
  {
    category: 'Pizza Ovens',
    name: 'Ooni Karu 12',
    description: 'Wood and charcoal-fired portable pizza oven.',
    image: 'https://ooni.com/cdn/shop/files/2048x2048-PDP-Karu12-Front.webp?v=1749094452&width=2048',
    url: 'https://ooni.com/products/ooni-karu?variant=32713728491617&_gsid=dpo7pud1p8gA&utm_source=chatgpt.com',
  },
  {
    category: 'Pizza Ovens',
    name: 'Solo Stove Pi Prime',
    description: 'Gas-powered pizza oven with precision control.',
    image: 'https://content.solostove.com/image/upload/c_fill,h_405,w_405/f_auto/dpr_auto/q_auto/v1/transform/37aa4495-1f31-4065-be95-39498d8bef91/PDP_Pi-Prime_Free-Shetler-Banner_Pi-Prime',
    url: 'https://www.solostove.com/en-us/p/pi-prime?sku=PIZZA-OVEN-PRIME',
  },
  {
    category: 'Accessories',
    name: 'Log Rack & Cover',
    description: 'Keeps your firewood dry and organized year-round.',
    image: 'https://m.media-amazon.com/images/I/81zHGECBN0L._AC_SL1500_.jpg',
    url: 'https://www.amazon.com/Pleasant-Hearth-Premium-Heavy-Cover/dp/B00FK6OZI2?th=1',
  },
  {
    category: 'Accessories',
    name: 'Natural Fire Starters',
    description: 'All-natural starters for wood, charcoal, or pellets.',
    image: 'https://m.media-amazon.com/images/I/81kub8zQsBL._AC_SL1500_.jpg',
    url: 'https://www.amazon.com/Shwuevei-pcs-Fire-Starter-Fireplace/dp/B0BNMJPR9W/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.ISWDo8YiecWw8d_tCmi-gOjy3AOSy0sEZLc_i4-JVrZgdbXT4SlCN0Qj5sw2JdOd7ouTUtlPrWhQ5ogSamTYHXxuMAQvkZnO3mlVMqt_eeWgeVjpEWfSoh-UjBCgoXdsECzpANovvAcAU4kl6OrNajmXXPnD2EJiSVtpRd-_dmgqLzbwQpGFvGl6PLggepMBQiVFmSOhxffpwd81JRiUc0D6oyBphulO-6wZeQV11_8.QDgQfg03Rcb01a_YTc6pgAixciNSoa8f9d9J1qy1Hzc&dib_tag=se&keywords=natural%2Bfire%2Bstarters&qid=1751323312&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1',
  },
];

const categories = ['All', 'Fire Pits', 'Pizza Ovens', 'Accessories'];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { filters, setFilters, showResults, setShowResults } = useFilterContext();

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-amber-50">
      <Header onSearchClick={() => setIsSearchOpen(true)} />

      {/* Hero */}
      <div className="py-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Firewood Accessories</h1>
        <p className="mt-3 text-gray-700 max-w-2xl mx-auto">
          Hand-picked fire pits, pizza ovens, and accessories. These are affiliate links — thank you for supporting the site!
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-10 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border ${
              activeCategory === cat
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-amber-100'
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div key={product.name} className="bg-white rounded-lg shadow p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
            >
              Buy Now
            </a>
          </div>
        ))}
      </div>

      {/* Search Filters Overlay */}
      <SearchFilters
        filters={filters}
        onFiltersChange={(newFilters) => {
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
