import React, { useEffect, useState } from 'react';

function TechnicianList() {
    const [technicians, setTechnicians] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/technicians/');

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <table className="table">
            <thead className="table-dark">
                <tr>
                    <th>Employee ID</th>
                    <th>First name</th>
                    <th>Last name</th>
                </tr>
            </thead>
            <tbody>
                {technicians.map((technician) => (
                    <tr key={technician.employee_id}> 
                        <td>{technician.employee_id}</td>
                        <td>{technician.first_name}</td>
                        <td>{technician.last_name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TechnicianList;
