import React from 'react';
import { shallow } from 'enzyme';

import TotalGuesses from './TotalGuesses';
import { checkProps } from "../test/testUtils";

const defaultProps = { totalGuesses: 0 };

/**
 * Factory function to create a ShallowWrapper for the App component
 * @param {object} props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<TotalGuesses { ...setupProps } />)
};

test('renders without error', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
});

test('does not throw warning with expected props', () => {
    const expectedProps = { totalGuesses: 3 };
    checkProps(TotalGuesses, expectedProps);
});
