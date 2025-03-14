import React, { useState } from "react";

const Dynamic= ({ rows, columns }) => {
  const [tableData, setTableData] = useState(
    Array.from({ length: rows }, () => Array.from({ length: columns }, () => ""))
  );

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  return (
    <div className="overflow-auto">
      <table className="w-full border-collapse">
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="border p-2">
                  <textarea
                    value={cell}
                    onChange={(e) =>
                      handleCellChange(rowIndex, colIndex, e.target.value)
                    }
                    className="w-full h-full resize"
                    style={{ minHeight: "50px", minWidth: "100px" }}
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

export default Dynamic;