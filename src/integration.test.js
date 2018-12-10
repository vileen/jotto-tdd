import { storeFactory } from "../test/testUtils";
import {guessWord, startNewGame} from './actions';

describe('guessWord action dispatcher', () => {
    const secretWord = 'party';
    const unsuccessfulGuess = 'train';

    describe('no guessed words', () => {
        let store;
        const initialState = { secretWord };
        beforeEach(() => {
            store = storeFactory(initialState);
        });

        test('updates state correctly for unsuccessful guess', () => {
            store.dispatch(guessWord(unsuccessfulGuess));
            const newState = store.getState();
            const expectedState = {
                ...initialState,
                success: false,
                givenUp: false,
                error: false,
                modeChosen: '',
                guessedWords: [
                    { guessedWord: unsuccessfulGuess, letterMatchCount: 3 }
                ]
            };
            expect(newState).toEqual(expectedState);
        });

        test('updates state correctly for successful guess', () => {
            store.dispatch(guessWord(secretWord));
            const newState = store.getState();
            const expectedState = {
                ...initialState,
                success: true,
                givenUp: false,
                error: false,
                modeChosen: '',
                guessedWords: [
                    { guessedWord: secretWord, letterMatchCount: secretWord.length }
                ]
            };
            expect(newState).toEqual(expectedState);
        });
    });

    describe('some guessed words', () => {
        const guessedWords = [ { guessWord: 'agile', letterMatchCount: 1 } ];
        const initialState = { guessedWords, secretWord };
        let store;
        beforeEach(() => {
            store = storeFactory(initialState);
        });

        test('updates state correctly for unsuccessful guess', () => {
            store.dispatch(guessWord(unsuccessfulGuess));
            const newState = store.getState();
            const expectedState = {
                secretWord,
                success: false,
                givenUp: false,
                error: false,
                modeChosen: "",
                guessedWords: [...guessedWords, { guessedWord: unsuccessfulGuess, letterMatchCount: 3}]
            };
            expect(newState).toEqual(expectedState);
        });

        test('updates state correctly for successful guess', () => {
            store.dispatch(guessWord(secretWord));
            const newState = store.getState();
            const expectedState = {
                secretWord,
                givenUp: false,
                success: true,
                error: false,
                modeChosen: "",
                guessedWords: [
                    ...guessedWords, { guessedWord: secretWord, letterMatchCount: secretWord.length }
                ]
            };
            expect(newState).toEqual(expectedState);
        });
    });
});

test('startNewGame action dispatcher updated state correctly', () => {
    const initialState = {
        success: true,
        givenUp: false,
        error: false,
        secretWord: 'train',
        modeChosen: "random",
        guessedWords: [
            { guessedWord: 'male', letterMatchCount: 1}
        ]
    };
    let store = storeFactory(initialState);

    store.dispatch(startNewGame());
    const newState = store.getState();
    const expectedState = {
        ...initialState,
        success: false,
        guessedWords: []
    };
    expect(newState).toEqual(expectedState);
});
