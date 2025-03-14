import React, { useState } from "react";

const PopupForm = ({ onSubmit, onClose }) => {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rows, columns);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create Table</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rows</label>
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Columns</label>
            <input
              type="number"
              value={columns}
              onChange={(e) => setColumns(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;