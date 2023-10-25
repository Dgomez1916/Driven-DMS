import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salespeople/form">Add a Salesperson</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salespeople">Salespeople List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salespeople/history">Salesperson History</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="customers/form">Add a Customer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers">Customer List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/form">Record a New Sale</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales">Our Sales</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers">Manufacturers List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers/form/">Add a Manufacturer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/models/form">Add a Model</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/models">Models List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobiles/form">Add Inventory</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobiles">Inventory List</NavLink>
            </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/technicians/new">Create Technician</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/technicians">Technicians List</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/appointments/new">New Appointment</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/appointments">Appointments List</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/appointments/history">Appointments History</NavLink>
          </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
