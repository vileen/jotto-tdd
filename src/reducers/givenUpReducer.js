import { actionTypes } from "../actions";

const initialState = false;

export default (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GIVEN_UP:
            return true;
        case actionTypes.START_NEW_GAME:
            return initialState;
        default:
            return state;
    }
}