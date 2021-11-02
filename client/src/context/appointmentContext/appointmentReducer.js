import {
    GET_APPOINTMENTS,
    APPOINTMENT_ERROR,
    CLEAR_ERRORS,
    SELECT_PHYSICIAN,
} from "../types";

export default (state, { type, payload }) => {
    switch (type) {
        case GET_APPOINTMENTS:
            return {
                ...state,
                appointments: payload,
                error: null,
            };
        case SELECT_PHYSICIAN:
            return {
                ...state,
                filteredAppointments: payload,
            };
        case APPOINTMENT_ERROR:
            return {
                ...state,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
