import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await API.get('/orders');
    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/orders/${id}`, { status });
    fetchOrders();
  };

  useEffect(() => { fetchOrders(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <ul>
        {orders.map(o => (
          <li key={o._id} className="border p-2 mb-2 rounded">
            <p>User: {o.user.name}</p>
            <p>Total: ${o.total}</p>
            <p>Status: {o.status}</p>
            <div className="space-x-2 mt-2">
              <button onClick={() => updateStatus(o._id, 'Processing')} className="bg-yellow-500 text-white px-2 py-1 rounded">Processing</button>
              <button onClick={() => updateStatus(o._id, 'Shipped')} className="bg-blue-500 text-white px-2 py-1 rounded">Shipped</button>
              <button onClick={() => updateStatus(o._id, 'Delivered')} className="bg-green-500 text-white px-2 py-1 rounded">Delivered</button>
              <button onClick={() => updateStatus(o._id, 'Cancelled')} className="bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
            </div>
            <ul className="ml-4 mt-2">
              {o.products.map(p => (
                <li key={p.product._id}>{p.product.title} x {p.quantity}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
