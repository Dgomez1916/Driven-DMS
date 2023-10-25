import { useState, useEffect } from "react";



const AppointmentsList = () => {
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


	const deleteAppointment = async (id) => {
		const appointmentUrl = `http://localhost:8080/api/appointments/${id}/cancel/`;
		const fetchConfig = {
			method: "put",
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(appointmentUrl, fetchConfig);
		if (response.ok) {
			fetchAppointments();
		}
	};

	const finishAppointment = async (id) => {
		const appointmentUrl = `http://localhost:8080/api/appointments/${id}/finish/`;
		const fetchConfig = {
			method: "put",
			body: JSON.stringify({ finished: true }),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(appointmentUrl, fetchConfig);
		if (response.ok) {
			fetchAppointments();
		}
	};

	return (
		<>
			<div className="px-4 py-5 my-1 mt-0 text-center">
				<h1 className="display-5">Service Appointments</h1>
			</div>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>VIN</th>
						<th>Customer</th>
						<th>Date</th>
						<th>Time</th>
						<th>Technician</th>
						<th>Reason</th>
						<th>Vip</th>
					</tr>
				</thead>
				<tbody>
					{appointments.map((appointment) => {
						if (!appointment.finished) {
							return (
								<tr className="table-row" key={appointment.id}>
									<td>{appointment.vin}</td>
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
									<td>{appointment.vip ? "Yes" : "No"}</td>
									<td>
										<button
											style={{ backgroundColor: 'red' }}
											onClick={(e) => deleteAppointment(appointment.id)}
											className="btn btn-secondary m-2">
											Cancel
										</button>
										<button
											style={{ backgroundColor: 'green' }}
											onClick={(e) => finishAppointment(appointment.id)}
											className="btn btn-primary">
											Finished
										</button>
									</td>
								</tr>
							);
						}
					})}
				</tbody>
			</table>
		</>
	);
};

export default AppointmentsList;
