import React, { useState, useRef, useEffect } from 'react';

const MyTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [tableHeight, setTableHeight] = useState(400);
  const [tableWidth, setTableWidth] = useState(600);

  const generateTable = () => {
    const rowCount = parseInt(rows, 10);
    const colCount = parseInt(columns, 10);
    
    if (isNaN(rowCount) || isNaN(colCount) || rowCount < 1 || colCount < 1) {
      alert("Please enter valid values for rows and columns");
      return;
    }
    
    const newData = Array(rowCount)
      .fill(0)
      .map(() =>
        Array(colCount)
          .fill(0)
          .map(() => ({ value: '' }))
      );
    setTableData(newData);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col p-6 w-full max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dynamic Table Creator</h1>

      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-6"
      >
        Create New Table
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Table Configuration</h2>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Number of Rows:</label>
              <input
                type="number"
                value={rows}
                onChange={(e) => setRows(e.target.value)}
                className="w-full p-2 border rounded"
                min="1"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Number of Columns:</label>
              <input
                type="number"
                value={columns}
                onChange={(e) => setColumns(e.target.value)}
                className="w-full p-2 border rounded"
                min="1"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Table Height (px):</label>
              <input
                type="number"
                value={tableHeight}
                onChange={(e) => setTableHeight(parseInt(e.target.value, 10) || 400)}
                className="w-full p-2 border rounded"
                min="100"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Table Width (px):</label>
              <input
                type="number"
                value={tableWidth}
                onChange={(e) => setTableWidth(parseInt(e.target.value, 10) || 600)}
                className="w-full p-2 border rounded"
                min="100"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-300 hover:bg-gray-400 font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={generateTable}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Create Table
              </button>
            </div>
          </div>
        </div>
      )}

      {tableData.length > 0 && (
        <DynamicTable
          data={tableData}
          setData={setTableData}
          height={tableHeight}
          width={tableWidth}
        />
      )}
    </div>
  );
};

const DynamicTable = ({ data, setData, height, width }) => {
  const [cellSizes, setCellSizes] = useState([]);
  const tableRef = useRef(null);
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const startCellSize = useRef({ width: 0, height: 0 });
  const resizingCell = useRef(null);

  useEffect(() => {
    if (data.length > 0 && data[0].length > 0) {
      const initialCellSizes = data.map((row) =>
        row.map(() => ({ width: 100, height: 40 }))
      );
      setCellSizes(initialCellSizes);
    }
  }, [data]);

  const updateCellValue = (rowIndex, colIndex, newValue) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = {
      ...newData[rowIndex][colIndex],
      value: newValue,
    };
    setData(newData);
  };

  const handleTextareaChange = (e, rowIndex, colIndex) => {
    updateCellValue(rowIndex, colIndex, e.target.value);
  };

  const startCellResize = (e, rowIndex, colIndex, direction) => {
    e.preventDefault();
    resizingCell.current = { rowIndex, colIndex, direction };
    resizeStartPos.current = { x: e.clientX, y: e.clientY };
    
    if (cellSizes[rowIndex] && cellSizes[rowIndex][colIndex]) {
      startCellSize.current = {
        width: cellSizes[rowIndex][colIndex].width,
        height: cellSizes[rowIndex][colIndex].height,
      };
    } else {
      startCellSize.current = { width: 100, height: 40 };
    }

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
  };

  const handleResize = (e) => {
    if (!resizingCell.current) return;

    const { rowIndex, colIndex, direction } = resizingCell.current;
    
    if (!cellSizes[rowIndex] || !cellSizes[rowIndex][colIndex]) {
      return;
    }
    
    const newCellSizes = [...cellSizes];

    if (direction === 'horizontal') {
      const deltaX = e.clientX - resizeStartPos.current.x;
      newCellSizes[rowIndex][colIndex].width = Math.max(
        50,
        startCellSize.current.width + deltaX
      );
    }

    if (direction === 'vertical') {
      const deltaY = e.clientY - resizeStartPos.current.y;
      newCellSizes[rowIndex][colIndex].height = Math.max(
        30,
        startCellSize.current.height + deltaY
      );
    }

    setCellSizes(newCellSizes);
  };

  const stopResize = () => {
    resizingCell.current = null;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResize);
    };
  }, []);

  if (data.length > 0 && (!cellSizes.length || cellSizes.length !== data.length)) {
    return <div>Loading table...</div>;
  }

  return (
    <div className="overflow-auto border border-gray-300">
      <table className="border-collapse" style={{ height, width }} ref={tableRef}>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, colIndex) => (
                <td
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="border border-gray-300 relative"
                  style={{
                    width: cellSizes[rowIndex] && cellSizes[rowIndex][colIndex] 
                      ? `${cellSizes[rowIndex][colIndex].width}px` 
                      : '100px',
                    height: cellSizes[rowIndex] && cellSizes[rowIndex][colIndex] 
                      ? `${cellSizes[rowIndex][colIndex].height}px` 
                      : '40px',
                  }}
                >
                  <textarea
                    value={cell.value}
                    onChange={(e) =>
                      handleTextareaChange(e, rowIndex, colIndex)
                    }
                    className="w-full h-full p-2 resize-none border-none outline-none"
                  />
            
                  <div
                    className="absolute top-0 right-0 w-1 h-full bg-transparent hover:bg-blue-400 cursor-col-resize"
                    onMouseDown={(e) =>
                      startCellResize(e, rowIndex, colIndex, 'horizontal')
                    }
                  />
             
                  <div
                    className="absolute bottom-0 left-0 w-full h-1 bg-transparent hover:bg-blue-400 cursor-row-resize"
                    onMouseDown={(e) =>
                      startCellResize(e, rowIndex, colIndex, 'vertical')
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTable;