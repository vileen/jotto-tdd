import { combineReducers } from 'redux';
import success from './successReducer';
import guessedWords from './guessedWordReducer';
import secretWord from './secretWordReducer';
import givenUp from './givenUpReducer';
import modeChosen from './modeChosenReducer';

export default combineReducers({
    success,
    guessedWords,
    secretWord,
    givenUp,
    modeChosen
});
