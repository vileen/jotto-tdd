import moxios from 'moxios';

import { storeFactory } from "../../test/testUtils";
import { getSecretWord } from "./";

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
});
