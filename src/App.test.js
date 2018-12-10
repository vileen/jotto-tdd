import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import { storeFactory, findByTestAttr } from "../test/testUtils";

const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    return shallow(<App store={store}/>).dive();
};

describe('render', () => {
    test('renders without crashing', () => {
        const wrapper = setup();
        const appComponent = findByTestAttr(wrapper, 'component-app');
        expect(appComponent.length).toBe(1);
    });
});

describe('redux props', () => {
    test('has access to `modeChosen` piece of state', () => {
        const modeChosen = true;
        const wrapper = setup({modeChosen});
        const testedProp = wrapper.instance().props.modeChosen;
        expect(testedProp).toBe(modeChosen);
    });
    test('has access to `secretWord` piece of state', () => {
        const secretWord = 'rainy';
        const wrapper = setup({secretWord});
        const testedProp = wrapper.instance().props.secretWord;
        expect(testedProp).toBe(secretWord);
    });
    test('has access to `error` piece of state', () => {
        const error = false;
        const wrapper = setup({error});
        const testedProp = wrapper.instance().props.error;
        expect(testedProp).toBe(error);
    });
});
