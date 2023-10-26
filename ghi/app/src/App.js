import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './services/TechnicianForm';
import TechnicianList from './services/TechnicianList';
import AppointmentsList from './services/AppointmentsList';
import AppointmentForm from './services/AppointmentForm';
import AppointmentsHistory from './services/AppointmentHistory';
import SalespersonForm from './Sales/SalespersonForm';
import SalespersonList from './Sales/SalespersonList';
import SalespersonHistory from './Sales/SalespersonHistory';
import CustomerForm from './Sales/CustomerForm';
import CustomerList from './Sales/CustomerList';
import SaleForm from './Sales/SaleForm';
import SaleList from './Sales/SaleList';
import ManufacturerForm from './Inventory/ManufacturerForm';
import ManufacturerList from './Inventory/ManufacturerList';
import ModelsForm from './Inventory/ModelsForm';
import ModelsList from './Inventory/ModelsList';
import AutomobileForm from './Inventory/AutomobileForm';
import AutomobilesList from './Inventory/AutomobileList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians">
          <Route index element={<TechnicianList />} />
          <Route path="/technicians/new" element={<TechnicianForm />} /></Route>
          <Route path="appointments">
          <Route index element={<AppointmentsList />} />
          <Route path="/appointments/new" element={<AppointmentForm />} />
          <Route path="/appointments/history" element={<AppointmentsHistory />} /></Route>
          <Route path="/salespeople">
            <Route path="form" element={<SalespersonForm />} />
            <Route path="" element={<SalespersonList />} />
            <Route path="history" element={<SalespersonHistory />} />
          </Route>
          <Route path="/customers">
            <Route path="form" element={<CustomerForm />} />
            <Route path="" element={<CustomerList />} />
          </Route>
          <Route path="/sales">
            <Route path="form" element={<SaleForm />} />
            <Route path="" element={<SaleList />} />
          </Route>
          <Route path="/manufacturers">
            <Route path="" element={<ManufacturerList />} />
            <Route path="form" element={<ManufacturerForm />} />
          </Route>
          <Route path="/models">
            <Route path="form" element={<ModelsForm />} />
            <Route path="" element={<ModelsList />} />
          </Route>
          <Route path="/automobiles">
            <Route path="form" element={<AutomobileForm />} />
            <Route path="" element={<AutomobilesList />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
};

export default App;
