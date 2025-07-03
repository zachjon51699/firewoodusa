// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">FirewoodUSA</h3>
          <p className="text-sm text-gray-300">
            Helping homeowners, campers, and businesses find firewood near them across the U.S.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Explore</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><Link to="/home" className="hover:text-amber-500">Home</Link></li>
            <li><Link to="/products" className="hover:text-amber-500">Firewood Accessories</Link></li>
            <li><Link to="/about" className="hover:text-amber-500">About</Link></li>
            <li><Link to="/contact" className="hover:text-amber-500">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Contact</h4>
          <p className="text-sm text-gray-300">
            Email: <a href="mailto:help@findfirewoodusa.com" className="hover:text-amber-500">help@findfirewoodusa.com</a>
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Join Our Newsletter</h4>
          <form
            action="mailto:help@findfirewoodusa.com"
            method="POST"
            encType="text/plain"
            className="flex flex-col gap-3"
          >
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className="px-3 py-2 rounded bg-white text-black text-sm focus:ring-amber-500"
              required
            />
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded text-sm font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} FirewoodUSA. All rights reserved.
      </div>
    </footer>
  );
};
