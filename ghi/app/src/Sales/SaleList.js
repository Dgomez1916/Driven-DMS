import React, {useEffect, useState} from 'react';


function SaleList() {

    const[sales, setSales] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');
        if (response.ok) {
            const data = await response.json();
            setSales(data.sale);
        }
    };

    const handleDelete = async (id) => {
        const response = await fetch (`http://localhost:8090/api/sales/${id}/`, {
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
                <h1>Sales</h1>
                </div>
                <table className="table table-hover table-striped border border-5">
                    <thead>
                        <tr>
                            <th>Salesperson Employee ID</th>
                            <th>Salesperson Name</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales?.map(sales => {
                        return (
                            <tr key={ sales.id }>
                                <td>{ sales.salesperson.employee_id }</td>
                                <td>{ sales.salesperson.first_name + " " + sales.salesperson.last_name }</td>
                                <td>{ sales.customer.first_name + " " + sales.customer.last_name } </td>
                                <td>{ sales.automobile.vin }</td>
                                <td>{ sales.price }</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(sales.id)}>Delete</button>
                                </td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
    );
}

export default SaleList;
