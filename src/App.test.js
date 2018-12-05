import React from 'react';
import {shallow} from 'enzyme';

import App from './App';
import {storeFactory, findByTestAttr} from "../test/testUtils";

const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    return shallow(<App store={store}/>).dive();
};

it('renders without crashing', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
});

describe('redux props', () => {
    test('has access to `success` piece of state', () => {
        const success = true;
        const wrapper = setup({success});
        const testedProp = wrapper.instance().props.success;
        expect(testedProp).toBe(success);
    });

    test('has access to `secretWord` piece of state', () => {
        const secretWord = 'party';
        const wrapper = setup({secretWord});
        const testedProp = wrapper.instance().props.secretWord;
        expect(testedProp).toBe(secretWord);
    });

    test('has access to `guessedWords` piece of state', () => {
        const guessedWords = [
            {guessedWord: 'train', letterMatchCount: 3}
        ];
        const wrapper = setup({guessedWords});
        const testedProp = wrapper.instance().props.guessedWords;
        expect(testedProp).toEqual(guessedWords);
    });

    test('`getSecretWord` is a function in the props', () => {
        const wrapper = setup();
        const testedProp = wrapper.instance().props.getSecretWord;
        expect(testedProp).toBeInstanceOf(Function);
    });
});
