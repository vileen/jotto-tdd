import { actionTypes } from "../actions";

const initialState = "";

export default(state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_GAME_MODE:
            return action.payload;
        default:
            return state;
    }
}
