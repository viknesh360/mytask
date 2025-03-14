import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DynamicEditableTable from './pages/MyTable';
import Dynamic from './pages/Dynamic';
import PopupForm from './pages/PopupForm';
import MyTable from './pages/MyTable';
function App() {
  const [tableSize, setTableSize] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [tableConfig, setTableConfig] = useState({ rows: 0, columns: 0 });

  const handleCreateTable = (rows, columns) => {
    setTableConfig({ rows, columns });
    setShowPopup(false);
  };
  return (
    <>
     <div className="p-5">
     <MyTable/>
    </div>
    {/* <div className="p-4">
      <button
        onClick={() => setShowPopup(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Create Table
      </button>

      {showPopup && (
        <PopupForm
          onSubmit={handleCreateTable}
          onClose={() => setShowPopup(false)}
        />
      )}

      {tableConfig.rows > 0 && tableConfig.columns > 0 && (
        <div className="mt-4">
          <Dynamic rows={tableConfig.rows} columns={tableConfig.columns} />
        </div>
      )}
    </div> */}
    </>
  )
}

export default App
