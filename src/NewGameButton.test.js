import React from 'react';
import { shallow } from 'enzyme';

import NewGameButton, { UnconnectedNewGameButton } from './NewGameButton';
import { storeFactory } from "../test/testUtils";

const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    return shallow(<NewGameButton store={store} />).dive();
};

const setupUnconnected = (success = true, startNewGameMock = jest.fn(), getSecretWordMock = jest.fn()) => {
    return shallow(<UnconnectedNewGameButton
        success={success}
        startNewGame={startNewGameMock}
        getSecretWord={getSecretWordMock}/>);
};

describe('render', () => {
    let button;
    beforeEach(() => {
        button = setup();
    });
    test('renders without error', () => {
        expect(button.length).toBe(1);
    });
    test('renders empty component if success is false', () => {
        const button = setup({}, { success: false });
        expect(button.text()).toBe('');
    });
});

describe('redux props', () => {
    test('has `startNewGame` action creator is a function prop', () => {
        const button = setup();
        const startNewGameProp = button.instance().props.startNewGame;
        expect(startNewGameProp).toBeInstanceOf(Function);
    });
    test('`getSecretWord` action creator is a function prop', () => {
        const button = setup();
        const startNewGameProp = button.instance().props.getSecretWord;
        expect(startNewGameProp).toBeInstanceOf(Function);
    });
    test('`success` piece of state is prop', () => {
        const button = setup();
        const startNewGameProp = button.instance().props.success;
        expect(startNewGameProp).toBe(false);
    });
    test('`givenUp` piece of state is prop', () => {
        const button = setup();
        const givenUpProp = button.instance().props.givenUp;
        expect(givenUpProp).toBe(false);
    });
});


describe('action creators', () => {
    let button, startNewGameMock, getSecretWordMock;
    beforeEach(() => {
        startNewGameMock = jest.fn();
        getSecretWordMock = jest.fn();

        button = setupUnconnected(true, startNewGameMock, getSecretWordMock);
        button.simulate('click', { preventDefault() {}});
    });

    test('`startNewGame` gets called on button click', () => {
        expect(startNewGameMock).toHaveBeenCalledTimes(1);
    });

    test('`getSecretWord` gets called on button click', () => {
        expect(getSecretWordMock).toHaveBeenCalledTimes(1);
    });
});
