import React, { useEffect, useState } from 'react';
import API from '../api';
import Form from '../components/Form';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const fetchData = async () => {
    const [prodRes, vendorRes, catRes] = await Promise.all([
      API.get('/products'),
      API.get('/vendors'),
      API.get('/categories')
    ]);

    setProducts(prodRes.data);
    setVendors(vendorRes.data);
    setCategories(catRes.data);

    // Fetch all subcategories
    const subs = await Promise.all(catRes.data.map(async c => {
      const s = await API.get(`/subcategories/${c._id}`);
      return s.data.map(sc => ({ ...sc, parentName: c.name }));
    }));
    setSubcategories(subs.flat());
  };

  const addProduct = async (data) => {
    await API.post('/products', {
      title: data.title,
      description: data.description,
      price: parseFloat(data.price),
      vendor: data.vendor,
      category: data.category,
      subcategory: data.subcategory,
      stock: parseInt(data.stock),
      images: data.images ? data.images.split(',') : []
    });
    fetchData();
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchData();
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Form
        fields={[
          { name: 'title', label: 'Title' },
          { name: 'description', label: 'Description' },
          { name: 'price', label: 'Price' },
          { name: 'stock', label: 'Stock' },
          { name: 'vendor', label: 'Vendor', type: 'text' },
          { name: 'category', label: 'Category', type: 'text' },
          { name: 'subcategory', label: 'Subcategory', type: 'text' },
          { name: 'images', label: 'Image URLs (comma separated)' }
        ]}
        onSubmit={addProduct}
      />
      <ul>
        {products.map(p => (
          <li key={p._id} className="border p-2 mb-2 rounded flex justify-between items-center">
            {p.title} - ${p.price}
            <button onClick={() => deleteProduct(p._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
