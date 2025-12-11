import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Vendors from './pages/Vendors';
import Categories from './pages/Categories';
import Subcategories from './pages/Subcategories';
import Products from './pages/Products';
import Orders from './pages/Orders';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/subcategories" element={<Subcategories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
