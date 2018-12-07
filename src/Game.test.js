import React from 'react';
import { shallow } from 'enzyme';

import Game, { UnconnectedGame } from './Game';
import { storeFactory, findByTestAttr } from "../test/testUtils";

const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    return shallow(<Game store={store}/>).dive();
};

it('renders without crashing', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'component-game');
    expect(appComponent.length).toBe(1);
});

describe('redux props', () => {
    test('has access to `success` piece of state', () => {
        const success = true;
        const wrapper = setup({success});
        const testedProp = wrapper.instance().props.success;
        expect(testedProp).toBe(success);
    });

    test('has access to `guessedWords` piece of state', () => {
        const guessedWords = [
            {guessedWord: 'train', letterMatchCount: 3}
        ];
        const wrapper = setup({guessedWords});
        const testedProp = wrapper.instance().props.guessedWords;
        expect(testedProp).toEqual(guessedWords);
    });

    test('has access to `modeChosen` piece of state', () => {
        const modeChosen = 'random';
        const wrapper = setup({modeChosen});
        const testedProp = wrapper.instance().props.modeChosen;
        expect(testedProp).toEqual(modeChosen);
    });

    test('`getSecretWord` is a function in the props', () => {
        const wrapper = setup();
        const testedProp = wrapper.instance().props.getSecretWord;
        expect(testedProp).toBeInstanceOf(Function);
    });
});

describe('`getSecretWord` action creator', () => {
    test('runs on Game mount if `modeChosen` is random', () => {
        const getSecretWordMock = jest.fn();

        const props = {
            getSecretWord: getSecretWordMock,
            success: false,
            guessedWords: [],
            modeChosen: 'random'
        };
        // set up app component with getSecretWordMock as the getSecretWord prop
        const wrapper = shallow(<UnconnectedGame {...props} />);

        // run lifecycle method
        wrapper.instance().componentDidMount();

        // check to see if mock ran
        const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
        expect(getSecretWordCallCount).toBe(1);
        expect(getSecretWordMock).toHaveBeenCalledTimes(1); // the same as above
    });

    test('does not run on Game mount if `modeChosen` is user', () => {
        const getSecretWordMock = jest.fn();

        const props = {
            getSecretWord: getSecretWordMock,
            success: false,
            guessedWords: [],
            modeChosen: 'user'
        };
        // set up app component with getSecretWordMock as the getSecretWord prop
        const wrapper = shallow(<UnconnectedGame {...props} />);

        // run lifecycle method
        wrapper.instance().componentDidMount();

        // check to see if mock ran
        const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
        expect(getSecretWordCallCount).toBe(0);
        expect(getSecretWordMock).toHaveBeenCalledTimes(0); // the same as above
    });
});