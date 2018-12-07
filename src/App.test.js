import React from 'react';
import {shallow} from 'enzyme';

import App, { UnconnectedApp } from './App';
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
    test('has access to `modeChosen` piece of state', () => {
        const modeChosen = true;
        const wrapper = setup({modeChosen});
        const testedProp = wrapper.instance().props.modeChosen;
        expect(testedProp).toBe(modeChosen);
    });
});
