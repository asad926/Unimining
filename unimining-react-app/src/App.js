import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApproveForm from './ApproveForm';
import AdminLogin from './AdminLogin';
import AdminApprovedData from './AdminApprovedData';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route exact path="/" element={<ApproveForm/>} />
          <Route path="/admin" element={<AdminLogin/>} />
          <Route path="/approved_data" element={<AdminApprovedData/>} />
        </Routes>
    </div>
  );
}

export default App;
