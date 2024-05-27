import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddDevicePage from './Pages/AddDevicePage';
import EditDevicePage from './Pages/EditDevicePage';
import Komputer from './Pages/Komputer';
import CPUInfoPage from './Pages/CPUInfoPage';
import MemoryInfoPage from './Pages/MemoryInfoPage';
import NetworkInfoPage from './Pages/NetworkInfoPage';
import DiskInfoPage from './Pages/DiskInfoPage';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar/> */}
          <Routes>
            <Route path="/home" element={<Komputer />} />
            <Route path="/viewDevice/:mac_address" element={<Sidebar />}>
                  <Route index element={<CPUInfoPage />} />
                  <Route path="cpu" element={<CPUInfoPage />} />
                  <Route path="memory" element={<MemoryInfoPage />} />
                  <Route path="network" element={<NetworkInfoPage />} /> 
                  <Route path="disk" element={<DiskInfoPage />} />
            </Route>
            <Route path="/addDevice" element={<AddDevicePage />} />
            <Route path="/editDevice/:id" element={<EditDevicePage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

if (document.getElementById('app')) {
    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    )
}