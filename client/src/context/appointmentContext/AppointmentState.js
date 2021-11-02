import React, { useReducer } from "react";
import axios from "axios";
import AppointmentContext from "./appointmentContext";
import appointmentReducer from "./appointmentReducer";

import {
    SELECT_PHYSICIAN,
    APPOINTMENT_ERROR,
    CLEAR_ERRORS,
    GET_APPOINTMENTS,
} from "../types";

const AppointmentState = (props) => {
    const initialState = {
        appointments: [],
        filteredAppointments: [],
        error: null,
    };

    const [state, dispatch] = useReducer(appointmentReducer, initialState);

    // get Appointments for Today
    const getAppointments = async () => {
        try {
            const res = await axios.get("/api/appointments");
            dispatch({
                type: GET_APPOINTMENTS,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: APPOINTMENT_ERROR,
                payload: err.response.msg,
            });
        }
    };

    const selectPhysician = async (physicianID) => {
        let filteredAppointments = state.appointments.filter(
            (x) => x.physician === physicianID
        );
        dispatch({
            type: SELECT_PHYSICIAN,
            payload: filteredAppointments,
        });
    };

    const clearErrors = async () => {
        dispatch({
            type: CLEAR_ERRORS,
        });
    };

    return (
        <AppointmentContext.Provider
            value={{
                appointments: state.appointments,
                error: state.error,
                filteredAppointments: state.filteredAppointments,
                selectPhysician,
                getAppointments,
                clearErrors,
            }}
        >
            {props.children}
        </AppointmentContext.Provider>
    );
};

export default AppointmentState;
