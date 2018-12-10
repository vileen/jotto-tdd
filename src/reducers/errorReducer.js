import { actionTypes } from "../actions";

const initialState = false;

export default (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ERROR_CAUGHT:
            return true;
        default: return initialState;
    }
};
