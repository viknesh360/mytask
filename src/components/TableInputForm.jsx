import { useState } from 'react';

export default function TableInputForm({ onSubmit }) {
  const [rows, setRows] = useState(5);
  const [columns, setColumns] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rows, columns });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-xl">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Rows:</label>
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="border p-1 m-1"
              min="1"
            />
          </div>
          <div>
            <label>Columns:</label>
            <input
              type="number"
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
              className="border p-1 m-1"
              min="1"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
            Generate Table
          </button>
        </form>
      </div>
    </div>
  );
}
