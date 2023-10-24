import { React, useState, useEffect } from "react"

export default function AutoList() {
    const [autoList, setAutoList] = useState([])
    const fetchData = async () => {
        const url = "http://localhost:8100/api/automobiles/"
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setAutoList(data)
        }
    }

    const sold = (status) => {
        if (status === false) {
            return("Still in Inventory")
        } else {
            return("Sold")
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <div>
                <h1>Our Inventory</h1>
            </div>
        <table className="table table-hover table-striped border border-5">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Year</th>
                    <th>Manufacturer</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Sold</th>
                </tr>
            </thead>
            <tbody>
                {autoList.autos?.map(auto => {
                    return (
                        <tr key={auto.id}>
                            <td>{auto.vin}</td>
                            <td>{auto.year}</td>
                            <td>{auto.model.manufacturer.name}</td>
                            <td>{auto.model.name}</td>
                            <td>{auto.color}</td>
                            <td>{sold(auto.sold)}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
    )
}
