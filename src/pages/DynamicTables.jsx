import React, { useState, useEffect } from 'react';

const DynamicTable = () => {
  // State for table data and dimensions
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [tableData, setTableData] = useState([]);
  const [tableWidth, setTableWidth] = useState('100%');
  const [tableHeight, setTableHeight] = useState('300px');
  const [cellWidths, setCellWidths] = useState({});
  const [showForm, setShowForm] = useState(true);
  
  // Initialize table data
  useEffect(() => {
    const newData = Array(rows).fill().map(() => Array(columns).fill(''));
    setTableData(newData);
  }, [rows, columns]);
  
  // Handle cell content change
  const handleCellChange = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formRows = parseInt(e.target.rows.value);
    const formCols = parseInt(e.target.columns.value);
    
    if (formRows > 0 && formCols > 0) {
      setRows(formRows);
      setColumns(formCols);
      setShowForm(false);
    }
  };
  
  // Handle cell resize
  const handleCellResize = (colIndex, newWidth) => {
    setCellWidths({
      ...cellWidths,
      [colIndex]: newWidth
    });
  };
  
  // Reset and show form again
  const handleReset = () => {
    setShowForm(true);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {showForm ? (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Configure Table</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="rows" className="block text-sm font-medium mb-1">Rows:</label>
                <input 
                  type="number" 
                  id="rows" 
                  name="rows" 
                  defaultValue={rows}
                  min="1"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="columns" className="block text-sm font-medium mb-1">Columns:</label>
                <input 
                  type="number" 
                  id="columns" 
                  name="columns" 
                  defaultValue={columns}
                  min="1" 
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Create Table
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Table Controls</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label htmlFor="tableWidth" className="block text-sm font-medium mb-1">Table Width:</label>
                <input 
                  type="text" 
                  id="tableWidth" 
                  value={tableWidth} 
                  onChange={(e) => setTableWidth(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="tableHeight" className="block text-sm font-medium mb-1">Table Height:</label>
                <input 
                  type="text" 
                  id="tableHeight" 
                  value={tableHeight} 
                  onChange={(e) => setTableHeight(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <button 
              onClick={handleReset} 
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Reconfigure Table
            </button>
          </div>
          
          <div 
            className="border rounded shadow overflow-auto"
            style={{ maxHeight: tableHeight, width: tableWidth }}
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  {Array(columns).fill().map((_, colIndex) => (
                    <th 
                      key={colIndex} 
                      className="border p-2 relative"
                      style={{ width: cellWidths[colIndex] || 'auto' }}
                    >
                      Column {colIndex + 1}
                      <div 
                        className="absolute top-0 right-0 bottom-0 w-1 cursor-col-resize bg-gray-400 opacity-0 hover:opacity-100"
                        onMouseDown={(e) => {
                          const startX = e.clientX;
                          const startWidth = e.target.parentElement.offsetWidth;
                          
                          const handleMouseMove = (moveEvent) => {
                            const newWidth = startWidth + moveEvent.clientX - startX;
                            if (newWidth > 50) {
                              handleCellResize(colIndex, newWidth + 'px');
                            }
                          };
                          
                          const handleMouseUp = () => {
                            document.removeEventListener('mousemove', handleMouseMove);
                            document.removeEventListener('mouseup', handleMouseUp);
                          };
                          
                          document.addEventListener('mousemove', handleMouseMove);
                          document.addEventListener('mouseup', handleMouseUp);
                        }}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <td 
                        key={colIndex} 
                        className="border p-0"
                        style={{ width: cellWidths[colIndex] || 'auto' }}
                      >
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                          className="w-full h-full p-2 border-none focus:outline-none"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default DynamicTable;