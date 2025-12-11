import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);

  const fetchVendors = async () => {
    const res = await API.get('/vendors');
    setVendors(res.data);
  };

  const approveVendor = async (id) => {
    await API.put(`/vendors/${id}/approve`);
    fetchVendors();
  };

  useEffect(() => { fetchVendors(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Vendors</h1>
      <ul>
        {vendors.map(v => (
          <li key={v._id} className="border p-2 mb-2 rounded flex justify-between items-center">
            <div>{v.name} ({v.owner.name}) - {v.approved ? 'Approved' : 'Pending'}</div>
            {!v.approved && <button onClick={() => approveVendor(v._id)} className="bg-green-500 text-white px-2 py-1 rounded">Approve</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
