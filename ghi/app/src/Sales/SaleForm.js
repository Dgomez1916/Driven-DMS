import React, {useEffect, useState} from 'react';


export default function SaleForm() {
    const[price, setPrice] = useState('');
    const[automobile, setAutomobile] = useState('');
    const[salesperson, setSalesperson] = useState('');
    const[customer, setCustomer] = useState('');

    const[automobiles, setAutomobiles] = useState([]);
    const[salespeople, setSalespeople] = useState([]);
    const[customers, setCustomers] = useState([]);

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.price = price;
        data.automobile = automobile;
        data.salesperson = salesperson;
        data.customer = customer;


        const saleUrl = "http://localhost:8090/api/sales/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(saleUrl, fetchConfig);

        if (response.ok) {;
            const autoUrl = `http://localhost:8100/api/automobiles/${automobile}/`;
            const autoData = {sold: true};
            const autoFetchOptions = {
                method: "PUT",
                body: JSON.stringify(autoData),
                headers: {
                    "Content-Type": "application/json",
                }
            }
            const resp = await fetch(autoUrl, autoFetchOptions)
        }

        if (response.ok) {
            const newSale = await response.json();
            fetchAutomobile();

            setPrice('');
            setAutomobile('');
            setSalesperson('');
            setCustomer('');
        }
    }


    const fetchAutomobile = async () => {
        const automobileUrl = "http://localhost:8100/api/automobiles/";
        const automobileResponse = await fetch(automobileUrl);
        if (automobileResponse.ok) {
            const automobileData = await automobileResponse.json();
            setAutomobiles(automobileData.autos);
        }
    }
    const fetchSalespeople = async () => {
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/';
        const salespeopleResponse = await fetch(salespeopleUrl);
        if (salespeopleResponse.ok) {
            const salespeopleData = await salespeopleResponse.json();
            setSalespeople(salespeopleData.salesperson);
        }
    };

    const fetchCustomer = async () => {
        const customerUrl = 'http://localhost:8090/api/customers/';
        const customerResponse = await fetch(customerUrl);
        if (customerResponse.ok) {
            const customerData = await customerResponse.json();
            setCustomers(customerData.customer);
        }
    };

    useEffect(() => {
        fetchAutomobile();
        fetchSalespeople();
        fetchCustomer();
    }, [])

    const filteredAutomobiles = automobiles.filter(automobile => automobile.sold === false)

    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Record a new sale</h1>
                    <form onSubmit={handleSubmit} id="create-sales-form">
                        <div className="mb-3">
                            <label htmlFor="automobile" className="form-label"></label>
                            <select onChange={handleAutomobileChange} value={automobile} required id="automobile" name="automobile" className="form-select">
                                <option value="">Choose an Automobile VIN</option>
                                {filteredAutomobiles.map(automobile => {
                                    return (
                                        <option key={ automobile.vin } value={ automobile.vin }>
                                        {automobile.vin}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="salesperson" className="form-label"></label>
                            <select onChange={handleSalespersonChange} value={salesperson} required id="salesperson" name="salesperson" className="form-select">
                                <option value="">Choose a Salesperson</option>
                                {salespeople.map(salesperson => {
                                    return (
                                        <option key={ salesperson.id } value={ salesperson.id }>
                                            { salesperson.first_name + " " + salesperson.last_name }
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="customer" className="form-label"></label>
                            <select onChange={handleCustomerChange} value={customer} required id="customer" name="customer" className="form-select">
                                <option value="">Choose a Customer</option>
                                {customers.map(customer => {
                                    return (
                                        <option key={ customer.id } value={ customer.id }>
                                            { customer.first_name + " " + customer.last_name }
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePriceChange} value={price} placeholder="Price" required type="text" id="price" name="price" className="form-control"/>
                            <label htmlFor="price">Price</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

