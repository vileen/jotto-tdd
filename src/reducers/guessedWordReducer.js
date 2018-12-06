import { actionTypes } from "../actions";

const initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GUESS_WORD:
            return [...state, action.payload];
        case actionTypes.START_NEW_GAME:
            return initialState;
        default:
            return state;
    }
}