import React, {useEffect, useState} from 'react';

function ModelsList() {

    const[vehicleModels, setVehicleModels] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');
        if (response.ok) {
            const data = await response.json();
            setVehicleModels(data);
        }
    }

    const handleDelete = async (id) => {
        const response = await fetch (`http://localhost:8100/api/models/${id}/`, {
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
            <h1>Models</h1>
            </div>
            <table className="table table-hover table-striped border border-5">
                <thead>
                    <tr>
                        <th>Manufacturer</th>
                        <th>Name</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    { vehicleModels.models?.map( models => {
                    return (
                        <tr key={ models.id }>
                            <td>{  models.manufacturer.name }</td>
                            <td>{  models.name }</td>
                            <td><img src={ models.picture_url} alt="" width="100" height="100" />{}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete( models.id)}>Delete</button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ModelsList;
