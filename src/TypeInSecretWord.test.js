import React from 'react';
import {shallow} from "enzyme";

import {findByTestAttr, storeFactory} from "../test/testUtils";
import TypeInSecretWord, {UnconnectedTypeInSecretWord} from "./TypeInSecretWord";

const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    return shallow(<TypeInSecretWord store={store}/>).dive();
};

describe('render', () => {
    it('renders without error', () => {
        const wrapper = setup();
        expect(wrapper.length).toBe(1);
    });
    it('renders secret word input', () => {
        const wrapper = setup();
        const buttons = findByTestAttr(wrapper, 'secret-word-input');
        expect(buttons.length).toBe(1);
    });
    it('renders secret word submit button', () => {
        const wrapper = setup();
        const buttons = findByTestAttr(wrapper, 'secret-word-submit-button');
        expect(buttons.length).toBe(1);
    });
});

describe('`typeSecretWord` action creator', () => {
    let wrapper, button, typeSecretWordMock;
    const secretWord = 'rainy';
    beforeEach(() => {
        typeSecretWordMock = jest.fn();
        const props = {
            typeSecretWord: typeSecretWordMock
        };
        wrapper = shallow(<UnconnectedTypeInSecretWord {...props} />);
        button = findByTestAttr(wrapper, 'secret-word-submit-button');
        wrapper.instance().setState({ value: secretWord });
        button.simulate('click', { preventDefault() {} });
    });

    test('gets called on submit', () => {
        expect(typeSecretWordMock).toHaveBeenCalledTimes(1); // the same as above
    });
    test('gets called with right arguments', () => {
        const typeSecretWordArg = typeSecretWordMock.mock.calls[0][0];
        expect(typeSecretWordArg).toBe(secretWord);
    });
});