import React, {useEffect, useState} from 'react';


function SalespersonHistoryForm() {

    const[salesperson, setSalesperson] = useState('');
    const[salespeople, setSalespeople] = useState([]);
    const[sales, setSales] = useState([]);

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    }

    const fetchSalespeople = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salesperson);
        }
    };

    const handleDelete = async (id) => {
        const response = await fetch (`http://localhost:8090/api/sales/${id}/`, {
            method: "DELETE",
        });
        if (response.ok) {
            setSalesperson()
        }
    };

    const fetchSales = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');
        if (response.ok) {
            const data = await response.json();
            setSales(data.sale);

        }
    };

    useEffect(() => {
        fetchSalespeople();
        fetchSales();
    }, []);


    const filteredSalesperson = () => {
        return sales.filter((sale) =>
        sale.salesperson.employee_id.includes(salesperson)
        );
    }

    return (
        <div className="row">
            <div>
                <h1>Salesperson History</h1>
            </div>
            <div className="mb-3">
                <select onChange={handleSalespersonChange} value={salesperson} required id="salesperson" name="salesperson" className="form-select">
                    <option value="">Choose a Salesperson</option>
                    {salespeople.map(salesperson => {
                        return (
                            <option key={ salesperson.id } value={ salesperson.employee_id }>
                                { salesperson.first_name + " " + salesperson.last_name }
                            </option>
                        );
                    })}
                </select>
            </div>
            <table className="table table-hover table-striped border border-5">
                <thead>
                    <tr>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSalesperson().map(sale => {
                        return (
                            <tr key={ sale.id }>
                                <td>{ sale.salesperson.first_name + " " + sale.salesperson.last_name }</td>
                                <td>{ sale.customer.first_name + " " + sale.customer.last_name } </td>
                                <td>{ sale.automobile.vin }</td>
                                <td>${ sale.price }.00</td>
                                <td>
                                    <button className="btn btn-light" onClick={() => handleDelete(sale.id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default SalespersonHistoryForm;
