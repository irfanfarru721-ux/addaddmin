import React, { useEffect, useState } from 'react';
import API from '../api';
import Form from '../components/Form';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  
  const fetchCategories = async () => {
    const res = await API.get('/categories');
    setCategories(res.data);
  };

  const addCategory = async (data) => {
    await API.post('/categories', data);
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await API.delete(`/categories/${id}`);
    fetchCategories();
  };

  useEffect(() => { fetchCategories(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <Form fields={[{name:'name', label:'Category Name'}]} onSubmit={addCategory} />
      <ul>
        {categories.map(c => (
          <li key={c._id} className="border p-2 mb-2 rounded flex justify-between items-center">
            {c.name}
            <button onClick={() => deleteCategory(c._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
