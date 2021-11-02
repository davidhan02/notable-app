import React, { useReducer } from "react";
import axios from "axios";
import PhysicianContext from "./physicianContext";
import physicianReducer from "./physicianReducer";

import {
    SELECT_PHYSICIAN,
    PHYSICIAN_ERROR,
    CLEAR_ERRORS,
    GET_PHYSICIANS,
} from "../types";

const PhysicianState = (props) => {
    const initialState = {
        selectedPhysician: null,
        physicians: [],
        error: null,
    };

    const [state, dispatch] = useReducer(physicianReducer, initialState);

    // get physicians
    const getPhysicians = async () => {
        try {
            const res = await axios.get("/api/users");
            dispatch({
                type: GET_PHYSICIANS,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: PHYSICIAN_ERROR,
                payload: err.response.msg,
            });
        }
    };

    const selectPhysician = async (physicianID) => {
        let match = state.physicians.find((x) => x._id === physicianID);
        dispatch({
            type: SELECT_PHYSICIAN,
            payload: match,
        });
    };

    const clearErrors = async () => {
        dispatch({
            type: CLEAR_ERRORS,
        });
    };

    return (
        <PhysicianContext.Provider
            value={{
                physicians: state.physicians,
                selectedPhysician: state.selectedPhysician,
                error: state.error,
                selectPhysician,
                getPhysicians,
                clearErrors,
            }}
        >
            {props.children}
        </PhysicianContext.Provider>
    );
};

export default PhysicianState;
