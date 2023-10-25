import React, { useState } from 'react';


function CustomerForm() {
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[address, setAddress] = useState('');
    const[phoneNumber, setPhoneNumber] = useState('');

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    }

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNumber;

        const url = 'http://localhost:8090/api/customers/';
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
            setAddress('');
            setPhoneNumber('');
        }
    };

    return (
        <div className="container">
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add a Customer</h1>
                <form onSubmit={handleSubmit} id="add-a-customer-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleFirstNameChange} value={firstName} placeholder="First Name" required type="text" id="first_name" name="first_name" className="form-control"/>
                        <label htmlFor="FirstName">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleLastNameChange} value={lastName} placeholder="Last Name" required type="text" id="last_name" name="last_name" className="form-control"/>
                        <label htmlFor="lastName">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleAddressChange} value={address} placeholder="Address" required type="text" id="address" name="address" className="form-control"/>
                        <label htmlFor="address">Address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handlePhoneNumberChange} value={phoneNumber} placeholder="Phone Number" required type="text" id="phone_number" name="phone_number" className="form-control"/>
                        <label htmlFor="phoneNumber">Phone Number</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default CustomerForm;

