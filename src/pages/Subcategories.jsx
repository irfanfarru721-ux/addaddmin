import React, { useEffect, useState } from 'react';
import API from '../api';
import Form from '../components/Form';

export default function Subcategories() {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchSubcategories = async () => {
    const res = await API.get('/categories');
    setCategories(res.data);
    const subs = await Promise.all(res.data.map(async c => {
      const s = await API.get(`/subcategories/${c._id}`);
      return s.data.map(sc => ({ ...sc, parentName: c.name }));
    }));
    setSubcategories(subs.flat());
  };

  const addSubcategory = async (data) => {
    await API.post('/subcategories', { name: data.name, parentCategoryId: data.parentCategory });
    fetchSubcategories();
  };

  const deleteSubcategory = async (id) => {
    await API.delete(`/subcategories/${id}`);
    fetchSubcategories();
  };

  useEffect(() => { fetchSubcategories(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Subcategories</h1>
      <Form fields={[
        {name:'name', label:'Subcategory Name'},
        {name:'parentCategory', label:'Parent Category', type:'text'}
      ]} onSubmit={addSubcategory} />
      <ul>
        {subcategories.map(sc => (
          <li key={sc._id} className="border p-2 mb-2 rounded flex justify-between items-center">
            {sc.name} ({sc.parentName})
            <button onClick={() => deleteSubcategory(sc._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
