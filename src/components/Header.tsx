// src/components/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo / Navigation */}
        <div className="flex items-center space-x-6">
          <Link
            to="/home"
            className="flex items-center text-amber-600 text-2xl font-bold hover:underline"
          >
            {/* Larger tree icon only */}
            <TreePine className="h-8 w-8 mr-2" />
            FindFirewoodUSA
          </Link>
          <Link to="/home" className="text-gray-700 text-lg hover:text-gray-900">
            Directory
          </Link>
          <Link to="/about" className="text-gray-700 text-lg hover:text-gray-900">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 text-lg hover:text-gray-900">
            Contact
          </Link>
        </div>

        {/* Search Button */}
        <button
          onClick={onSearchClick}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
        >
          Search
        </button>
      </div>
    </header>
  );
};
