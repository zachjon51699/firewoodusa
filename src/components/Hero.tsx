import React from 'react';
import { Search, MapPin, TreePine } from 'lucide-react';

interface HeroProps {
  onSearchClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchClick }) => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <TreePine className="h-16 w-16 text-amber-600" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Firewood <span className="text-amber-600">Near Me</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Discover trusted firewood suppliers across the United States. From seasoned hardwoods to specialty cuts, 
          find the perfect wood for your fireplace, wood stove, or outdoor fire pit.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={onSearchClick}
            className="bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-3 text-lg font-semibold shadow-lg"
          >
            <Search className="h-5 w-5" />
            <span>Search Suppliers</span>
          </button>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="h-5 w-5" />
            <span>3,800+ suppliers nationwide</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <TreePine className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
            <p className="text-gray-600">Seasoned hardwoods and specialty cuts from verified suppliers</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Delivery</h3>
            <p className="text-gray-600">Find suppliers who deliver to your area with flexible options</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Search</h3>
            <p className="text-gray-600">Filter by wood type, location, pricing, and services</p>
          </div>
        </div>
      </div>
    </div>
  );
};
