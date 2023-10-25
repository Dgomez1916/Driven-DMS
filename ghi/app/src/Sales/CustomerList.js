import React, {useEffect, useState} from 'react';

function CustomerList() {

    const[customer, setCustomer] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8090/api/customers/');
        if (response.ok) {
            const data = await response.json();
            setCustomer(data.customer);
        }
    }

    const handleDelete = async (id) => {
        const response = await fetch (`http://localhost:8090/api/customers/${id}/`, {
            method: "DELETE",

        });

        if (response.ok) {
            fetchData()
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

        return (
            <div>
                <div>
                <h1>Customers</h1>
                </div>
                <table className="table table-hover table-striped border border-5">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer?.map(customer => {
                        return (
                                <tr key={customer.id}>
                                    <td>{ customer.first_name }</td>
                                    <td>{ customer.last_name }</td>
                                    <td>{ customer.address}</td>
                                    <td>{ customer.phone_number }</td>
                                    <td>
                                        <button className="btn btn-outline-danger" onClick={() => handleDelete(customer.id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
}

export default CustomerList;
