import React, { useState } from 'react';


function SalespersonForm() {
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[employeeId, setEmployeeId] = useState('');

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleEmployeeIdChange = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const url = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setFirstName('');
            setLastName('');
            setEmployeeId('');
        }
    }

    return (
        <div className="container">
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add a Salesperson</h1>
                <form onSubmit={handleSubmit} id="add-a-salesperson-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleFirstNameChange} value={firstName} placeholder="First Name" required type="text" id="first_name" name="first_name" className="form-control"/>
                        <label htmlFor="FirstName">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleLastNameChange} value={lastName} placeholder="Last Name" required type="text" id="last_name" name="last_name" className="form-control"/>
                        <label htmlFor="lastName">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleEmployeeIdChange} value={employeeId} placeholder="Employee Id" required type="text" id="employee_id" name="employee_id" className="form-control"/>
                        <label htmlFor="employeeId">Employee Id</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SalespersonForm;
