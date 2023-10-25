import React, {useEffect, useState} from 'react';


function ModelsForm() {
    const[name, setName] = useState('');
    const[pictureUrl, setPictureUrl] = useState('');
    const[manufacturer, setManufacturer] = useState('');
    const[manufacturers, setManufacturers] = useState([]);

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = name;
        data.manufacturer_id= manufacturer;
        data.picture_url = pictureUrl;

        const url = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            setName('');
            setPictureUrl('');
            setManufacturer('');
        }
    };

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
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
                        <h1>Add a new Vehicle Model</h1>
                    <form onSubmit={handleSubmit} id="create-sales-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" id="name" name="name" className="form-control"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureUrlChange} value={pictureUrl} placeholder="Picture Url" required type="url" id="picture_url" name="picture_url" className="form-control"/>
                            <label htmlFor="picture_url">Picture URL</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="customer" className="form-label"></label>
                            <select onChange={handleManufacturerChange} value={manufacturer} required id="manufacturer" name="manufacturer" className="form-select">
                                <option value="">Choose a Manufacturer</option>
                                {manufacturers.map(manufacturer => {
                                    return (
                                        <option key={ manufacturer.id } value={ manufacturer.id }>
                                            { manufacturer.name }
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

export default ModelsForm;
