import { useState } from "react";

const TechnicianForm = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { first_name, last_name, employee_id };

    const techUrl = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(techUrl, fetchConfig);
    if (response.ok) {
      event.target.reset();
      setFirstName("");
      setLastName("");
      setEmployeeId("");
      setSubmitted(true);
      setInvalid("");
    } else {
      console.error("Invalid employee ID");
      setInvalid(true);
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="text-center">Add a Technician</h1>
          <form id="create-technician-form" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
                type="text"
                name="first_name"
                id="first_name"
                className="form-control"
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
                type="text"
                name="last_name"
                id="last_name"
                className="form-control"
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Employee ID"
                required
                type="employee_id"
                name="employee_id"
                id="employee_id"
                className="form-control"
              />
              <label htmlFor="employee_id">Employee ID</label>
            </div>
            <div className="col text-center">
              <button className="btn btn-primary">Create</button>
            </div>
          </form>
          {invalid && (
            <div
              className="alert alert-danger mb-0 p-4 mt-4"
              id="success-message"
            >
              You have submitted an invalid employee ID or that ID is already
              in use.
            </div>
          )}
          {!invalid && submitted && (
            <div
              className="alert alert-success mb-0 p-4 mt-4"
              id="success-message"
            >
              You have successfully added a new technician!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicianForm;
