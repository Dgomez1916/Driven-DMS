import { useState, useEffect } from "react";



const AppointmentsHistory = () => {
	const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

	return (
		<>
			<div className="px-4 py-5 my-1 mt-0 text-center">
				<h1 className="display-5">Service Appointments</h1>
			</div>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>VIN</th>
                        <th>Is VIP?</th>
						<th>Customer</th>
						<th>Date</th>
						<th>Time</th>
						<th>Technician</th>
						<th>Reason</th>
                        <th>Status</th>
					</tr>
				</thead>
				<tbody>
					{appointments.map((appointment) => {
                        return (
                            <tr className="table-row" key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.vip ? "Yes" : "No"}</td>
                                <td>{appointment.customer}</td>
                                <td>
                                    {new Date(appointment.date_time).toLocaleDateString(
                                        "en-US"
                                    )}
                                </td>
                                <td>
                                    {new Date(appointment.date_time).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </td>
                                <td>{appointment.technician.first_name + ' ' + appointment.technician.last_name}</td>
                                <td>{appointment.reason}</td>
                                <td>
                                    {appointment.status === "pending"
                                        ? "Pending"
                                        : appointment.status === "finished"
                                        ? "Finished"
                                        : "Canceled"}
                                </td>
                            </tr>
                        );
					})}
				</tbody>
			</table>
		</>
	);
};

export default AppointmentsHistory;
