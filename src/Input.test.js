import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from "../test/testUtils";
import Input from './Input';

// without dive Input would be returned instead of its children
const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<Input store={store}/>).dive();
};

describe('render', () => {
    describe('word has not been guessed', () => {
        test('renders component without error', () => {

        });

        test('renders input box', () => {

        });

        test('renders submit button', () => {

        });
    });

    describe('word has been guessed', () => {
        test('renders component without error', () => {

        });

        test('does not renders input box', () => {

        });

        test('does not renders submit button', () => {

        });
    });
});

describe('update state', () => {

});
