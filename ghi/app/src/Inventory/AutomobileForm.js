import React, { useState, useEffect } from 'react';


function AutomobileForm() {
    const[color, setColor] = useState('');
    const[year, setYear] = useState('');
    const[vin, setVin] = useState('');
    const[model, setModel] = useState('');
    const[models, setModels] = useState([]);

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model_id = model;

        const url = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setColor('');
            setYear('');
            setVin('');
            setModel('');
        }
    };

const fetchData = async () => {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        setModels(data.models);
    }
};

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="container">
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add a Automobile to Inventory</h1>
                <form onSubmit={handleSubmit} id="add-a-salesperson-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleColorChange} value={color} placeholder="color" required type="text" id="color" name="color" className="form-control"/>
                        <label htmlFor="color">Color</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleYearChange} value={year} placeholder="year" required type="text" id="year" name="year" className="form-control"/>
                        <label htmlFor="year">Year</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleVinChange} value={vin} placeholder="vin" required type="text" id="vin" name="vin" className="form-control"/>
                        <label htmlFor="vin">Vin</label>
                    </div>
                    <div className="mb-3">
                            <label htmlFor="model" className="form-label"></label>
                            <select onChange={handleModelChange} value={model} required id="model" name="model" className="form-select">
                                <option value="">Choose a Model</option>
                                {models.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default AutomobileForm;
