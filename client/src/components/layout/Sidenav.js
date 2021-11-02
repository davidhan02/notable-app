import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AppointmentContext from "../../context/appointmentContext/appointmentContext";
import AuthContext from "../../context/authContext/authContext";
import PhysicianContext from "../../context/physicianContext/physicianContext";

const Sidenav = () => {
    const physicianContext = useContext(PhysicianContext);
    const appointmentContext = useContext(AppointmentContext);

    const { physicians, selectedPhysician } = physicianContext;

    const onNameClick = (email) => {
        console.log("clicked", email);
        physicianContext.selectPhysician(email);
        appointmentContext.selectPhysician(email);
        console.log(selectedPhysician);
    };

    return (
        <div className="sidenav w-25 bg-light p-5">
            <h1 className="mb-5">Notable</h1>
            <h5>PHYSICIANS</h5>
            <ul>
                {physicians.map((physician) => {
                    return (
                        <li key={physician._id}>
                            <a
                                href="#"
                                onClick={() => onNameClick(physician._id)}
                            >
                                {physician.name}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidenav;
