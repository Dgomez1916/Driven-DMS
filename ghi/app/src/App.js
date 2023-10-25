import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import AppointmentsList from './AppointmentsList';
import AppointmentForm from './AppointmentForm';
import AppointmentsHistory from './AppointmentHistory';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
