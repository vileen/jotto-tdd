import React from 'react';
import { shallow } from 'enzyme';

import ChooseMode, { UnconnectedChooseMode } from './ChooseMode';
import {findByTestAttr, storeFactory} from "../test/testUtils";


const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    return shallow(<ChooseMode store={store}/>).dive();
};

describe('render', () => {
    it('renders component without crashing', () => {
        const wrapper = setup();
        expect(wrapper.length).toBe(1);
    });
    it('renders mode choice buttons', () => {
        const wrapper = setup();
        const buttons = findByTestAttr(wrapper, 'choose-mode-button');
        expect(buttons.length).toBe(2);
    });

});

describe('`setGameMode` action creator', () => {
    const setGameModeMock = jest.fn();
    const modes = ['random', 'user'];
    const props = {
        setGameMode: setGameModeMock
    };
    const wrapper = shallow(<UnconnectedChooseMode {...props} />);

    const buttons = findByTestAttr(wrapper, 'choose-mode-button');
    test('gets called on button click', () => {
        buttons.at(0).simulate('click');

        const setGameModeArg = setGameModeMock.mock.calls[0][0];
        expect(setGameModeArg).toBe(modes[0]);
        expect(setGameModeMock).toHaveBeenCalledTimes(1); // the same as above
    });
    test('gets called on button click', () => {
        buttons.at(1).simulate('click');

        const setGameModeArg = setGameModeMock.mock.calls[1][0];
        expect(setGameModeArg).toBe(modes[1]);
        expect(setGameModeMock).toHaveBeenCalledTimes(2); // the same as above
    });
});

