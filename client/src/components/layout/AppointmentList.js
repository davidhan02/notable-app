import React, { useContext } from "react";
import AppointmentContext from "../../context/appointmentContext/appointmentContext";
import PhysicianContext from "../../context/physicianContext/physicianContext";

const AppointmentList = () => {
    const { selectedPhysician } = useContext(PhysicianContext);
    const { filteredAppointments } = useContext(AppointmentContext);

    if (!selectedPhysician)
        return (
            <div className="w-75 p-3">
                <h2>Please select a physician</h2>
            </div>
        );
    return (
        <div className="w-75 p-3">
            <h2>{selectedPhysician.name}</h2>
            <p>{selectedPhysician.email}</p>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Time</th>
                        <th scope="col">Kind</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.map((appointment, idx) => (
                        <tr key={appointment._id}>
                            <th scope="row">{idx + 1}</th>
                            <td>{appointment.name}</td>
                            <td>
                                {new Date(
                                    appointment.appointmentTime
                                ).toLocaleTimeString()}
                            </td>
                            <td>{appointment.kind}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentList;
