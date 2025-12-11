import React from 'react';

export default function Table({ headers, data, actions }) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          {headers.map((h, i) => <th key={i} className="border p-2">{h}</th>)}
          {actions && <th className="border p-2">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="hover:bg-gray-100">
            {headers.map((h, j) => <td key={j} className="border p-2">{row[h]}</td>)}
            {actions && <td className="border p-2">{actions(row)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
