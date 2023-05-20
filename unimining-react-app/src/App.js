import './App.css';
import { Route, Routes } from 'react-router-dom';
import ApproveForm from './ApproveForm';
import AdminLogin from './AdminLogin';
import AdminApprovedData from './AdminApprovedData';
import QRCodeGenerator from './QRCodeGenerator';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route exact path="/approve" element={<ApproveForm/>} />
          <Route path="/" element={<AdminLogin/>} />
          <Route path="/admin" element={<AdminLogin/>} />
          <Route path="/approved-data" element={<AdminApprovedData/>} />
          <Route path="/qr-generator" element={<QRCodeGenerator/>} />
        </Routes>
    </div>
  );
}

export default App;
