import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AppointmentContext from "../../context/appointmentContext/appointmentContext";
import AuthContext from "../../context/authContext/authContext";
import PhysicianContext from "../../context/physicianContext/physicianContext";
import AppointmentList from "../layout/AppointmentList";
import Sidenav from "../layout/Sidenav";

const Home = () => {
    const { loadUser } = useContext(AuthContext);
    const { getPhysicians, physicians } = useContext(PhysicianContext);
    const { getAppointments, appointments } = useContext(AppointmentContext);

    useEffect(() => {
        loadUser();
        getPhysicians();
        getAppointments();
    }, []);

    return (
        <main className="d-flex">
            <Sidenav />
            <AppointmentList />
        </main>
    );
};

export default Home;
