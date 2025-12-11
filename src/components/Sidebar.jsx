import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <nav className="flex flex-col space-y-2">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/vendors" className="hover:bg-gray-700 p-2 rounded">Vendors</Link>
        <Link to="/categories" className="hover:bg-gray-700 p-2 rounded">Categories</Link>
        <Link to="/subcategories" className="hover:bg-gray-700 p-2 rounded">Subcategories</Link>
        <Link to="/products" className="hover:bg-gray-700 p-2 rounded">Products</Link>
        <Link to="/orders" className="hover:bg-gray-700 p-2 rounded">Orders</Link>
      </nav>
    </aside>
  );
}
