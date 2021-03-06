import { getLetterMatchCount } from "../helpers";
import axios from 'axios';

export const actionTypes = {
    CORRECT_GUESS: 'CORRECT_GUESS',
    GUESS_WORD: 'GUESS_WORD',
    SET_SECRET_WORD: 'SET_SECRET_WORD',
    START_NEW_GAME: 'START_NEW_GAME',
    GIVEN_UP: 'GIVEN_UP',
    SET_GAME_MODE: 'SET_GAME_MODE',
    ERROR_CAUGHT: 'ERROR_CAUGHT'
};

export const guessWord = guessedWord => {
    return function(dispatch, getState) {
        const secretWord = getState().secretWord;
        const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

        dispatch({
            type: actionTypes.GUESS_WORD,
            payload: { guessedWord, letterMatchCount }
        });

        if (guessedWord === secretWord) {
            dispatch({
                type: actionTypes.CORRECT_GUESS
            })
        }
    };
};

export const getSecretWord = () => {
    return dispatch => {
        return axios.get('http://localhost:3030').then(response => {
            dispatch({
                type: actionTypes.SET_SECRET_WORD,
                payload: response.data
            })
        }).catch(() => {
            dispatch({
                type: actionTypes.ERROR_CAUGHT
            })
        });
    };
};

export const typeSecretWord = word => {
    return dispatch => {
        dispatch({
            type: actionTypes.SET_SECRET_WORD,
            payload: word
        })
    };
};

export const setGameMode = mode => {
    return dispatch => {
        dispatch({
            type: actionTypes.SET_GAME_MODE,
            payload: mode
        })
    }
};

export const startNewGame = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.START_NEW_GAME
        })
    };
};

export const giveUp = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.GIVEN_UP
        })
    };
};
