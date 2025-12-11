import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Dashboard() {
  const [stats, setStats] = useState({ vendors: 0, categories: 0, products: 0, orders: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [vendors, categories, products, orders] = await Promise.all([
          API.get('/vendors'),
          API.get('/categories'),
          API.get('/products'),
          API.get('/orders')
        ]);
        setStats({
          vendors: vendors.data.length,
          categories: categories.data.length,
          products: products.data.length,
          orders: orders.data.length
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded">Vendors: {stats.vendors}</div>
        <div className="bg-green-500 text-white p-4 rounded">Categories: {stats.categories}</div>
        <div className="bg-yellow-500 text-white p-4 rounded">Products: {stats.products}</div>
        <div className="bg-red-500 text-white p-4 rounded">Orders: {stats.orders}</div>
      </div>
    </div>
  );
}
