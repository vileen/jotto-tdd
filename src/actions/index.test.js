import moxios from 'moxios';

import { storeFactory } from "../../test/testUtils";
import { getSecretWord, startNewGame } from "./";

describe('getSecretWord action creator', () => {
    beforeEach(() => {
        moxios.install(); // in case of using custom axios instance, pass it as an argument here
    });
    afterEach(() => {
        moxios.uninstall();
    });
    test('adds response word to the state', () => {
        const secretWord = 'party';
        const store = storeFactory();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: secretWord
            })
        });

        // return is here to make sure that promise actually resolves before completing the test
        return store.dispatch(getSecretWord()).then(() => {
            const newState = store.getState();
            expect(newState.secretWord).toBe(secretWord);
        });
    });
    test('dispatches error action if error caught', () => {
        const store = storeFactory();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 500
            })
        });

        // return is here to make sure that promise actually resolves before completing the test
        return store.dispatch(getSecretWord()).then(() => {
            const newState = store.getState();
            expect(newState.error).toBe(true);
        });
    });
});

describe('startNewGame action creator', () => {
    let store;
    beforeEach(() => {
        const initialState = {
            success: true,
            givenUp: false,
            error: false,
            modeChosen: "random",
            guessedWords: [
                { guessedWord: 'rainy', letterMatchCount: 1 },
                { guessedWord: 'train', letterMatchCount: 1 }
            ],
            secretWord: 'testy'
        };
         store = storeFactory(initialState);
         expect(store.getState()).toEqual(initialState);
    });
    test('`guessedWords` redux state gets cleared ', () => {
        store.dispatch(startNewGame());

        const guessedWordsState = store.getState().guessedWords;
        expect(guessedWordsState.length).toBe(0);
    });
    test('`success` redux state is set to false', () => {
        store.dispatch(startNewGame());

        const guessedWordsState = store.getState().success;
        expect(guessedWordsState).toBe(false);
    });
});
