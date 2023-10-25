import React, {useEffect, useState} from 'react';

function SalespersonList() {

    const[salesperson, setSalesperson] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if (response.ok) {
            const data = await response.json();
            setSalesperson(data.salesperson);
        }
    }

    const handleDelete = async (id) => {
        const response = await fetch (`http://localhost:8090/api/salespeople/${id}/`, {
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

                <h1>Salespeople</h1>
                </div>
                <table className="table table-hover table-striped border border-5">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Employee ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesperson?.map(salesperson => {
                        return (
                                <tr key={salesperson.id}>
                                    <td>{ salesperson.first_name}</td>
                                    <td>{ salesperson.last_name }</td>
                                    <td>{ salesperson.employee_id }</td>
                                    <td>
                                        <button className="btn btn-outline-danger" onClick={() => handleDelete(salesperson.id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
}

export default SalespersonList;

