import React, { useState } from 'react';

export default function Form({ initialValues, onSubmit, fields }) {
  const [values, setValues] = useState(initialValues || {});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      {fields.map(f => (
        <div key={f.name}>
          <label className="block">{f.label}</label>
          <input
            type={f.type || 'text'}
            name={f.name}
            value={values[f.name] || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}
