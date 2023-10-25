import { React, useState, useEffect } from "react"

export default function ManufacturerList() {
    const [manufacturerList, setManufacturerList] = useState([])
    const fetchData = async () => {
        const url = "http://localhost:8100/api/manufacturers/"
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setManufacturerList(data)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <table className="table table-hover table-striped border border-5">
            <thead>
                <tr>
                    <th>Our Manufacturers</th>
                </tr>
            </thead>
            <tbody>
                {manufacturerList.manufacturers?.map(manufacturer => {
                    return (
                        <tr key={manufacturer.id}>
                            <td>{manufacturer.name}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
