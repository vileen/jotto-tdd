import React from 'react';
import { shallow } from 'enzyme';

import GivenUp from './GivenUp';
import { storeFactory } from "../test/testUtils";

const setup = (initialState = { givenUp: false, secretWord: 'train' }) => {
    const store = storeFactory(initialState);
    return shallow(<GivenUp store={store} />).dive();
};

describe('render', () => {
    test('renders without error', () => {
        const component = setup();
        expect(component.length).toBe(1);
    });
    test('renders empty component if givenUp is null', () => {
        const component = setup();
        expect(component.text()).toBe('');
    });
});

describe('redux props', () => {
    test('has `givenUp` piece of state as prop', () => {
        const component = setup();
        const gaveUpProp = component.instance().props.givenUp;
        expect(gaveUpProp).toBe(false);
    });
    test('has `secretWord` piece of state as prop', () => {
        const component = setup();
        const secretWordProp = component.instance().props.secretWord;
        expect(secretWordProp).toBe('train');
    });
});
