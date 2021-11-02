import {
    GET_PHYSICIANS,
    PHYSICIAN_ERROR,
    CLEAR_ERRORS,
    SELECT_PHYSICIAN,
} from "../types";

export default (state, { type, payload }) => {
    switch (type) {
        case GET_PHYSICIANS:
            return {
                ...state,
                physicians: payload,
                error: null,
            };
        case SELECT_PHYSICIAN:
            return {
                ...state,
                selectedPhysician: payload,
            };
        case PHYSICIAN_ERROR:
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
