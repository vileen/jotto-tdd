import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from "../test/testUtils";
import Input, { UnconnectedInput } from './Input';

// without dive Input would be returned instead of its children
const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    return shallow(<Input store={store}/>).dive();
};

describe('render', () => {
    describe('word has not been guessed', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = { success: false };
            wrapper = setup(initialState);
        });
        test('renders component without error', () => {
            const component = findByTestAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });

        test('renders input box', () => {
            const component = findByTestAttr(wrapper, 'input-box');
            expect(component.length).toBe(1);
        });

        test('renders submit button', () => {
            const component = findByTestAttr(wrapper, 'submit-button');
            expect(component.length).toBe(1);
        });
    });

    describe('word has been guessed', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = { success: true };
            wrapper = setup(initialState);
        });

        test('renders component without error', () => {
            const component = findByTestAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });

        test('does not render input box', () => {
            const component = findByTestAttr(wrapper, 'input-box');
            expect(component.length).toBe(0);
        });

        test('does not render submit button', () => {
            const component = findByTestAttr(wrapper, 'submit-button');
            expect(component.length).toBe(0);
        });
    });
});

describe('redux props', () => {
    test('has success piece of state as prop', () => {
        const success = true;
        const wrapper = setup({ success });
        const successProp = wrapper.instance().props.success;
        expect(successProp).toBe(success);
    });
    test('`guessWord` action creator is a function prop', () => {
        const wrapper = setup();
        const guessWordProp = wrapper.instance().props.guessWord;
        expect(guessWordProp).toBeInstanceOf(Function);
    });
});

describe('`guessWord` action creator call', () => {
    let guessWordMock, wrapper, guessedWord = 'train';
    beforeEach(() => {
        guessWordMock = jest.fn();
        wrapper = shallow(<UnconnectedInput guessWord={guessWordMock} success={null}/>);

        wrapper.instance().setState({ value: guessedWord });

        const buttonComponent = findByTestAttr(wrapper, 'submit-button');
        expect(buttonComponent.length).toBe(1);
        buttonComponent.simulate('click', { preventDefault() {} });
    });
    test('calls `guessWord` when button is clicked', () => {
        expect(guessWordMock).toHaveBeenCalledTimes(1);
    });
    test('calls `guessWord` was called with input value as an argument', () => {
        const guessWordMockArg = guessWordMock.mock.calls[0][0];
        expect(guessWordMockArg).toBe(guessedWord);
    });
    test('input box clears on submit', () => {
        expect(wrapper.instance().state.value).toBe('');
    })
});
