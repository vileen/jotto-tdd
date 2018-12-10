import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import Game from "./Game";
import ChooseMode from './ChooseMode';
import TypeInSecretWord from "./TypeInSecretWord";
import ErrorPage from './ErrorPage';

export class UnconnectedApp extends Component {
    render() {
        const { modeChosen, secretWord, error } = this.props;

        let content = <ChooseMode />;
        if (error) {
            content = <ErrorPage />;
        } else if (modeChosen) {
            if (
                modeChosen === 'random' ||
                (modeChosen === 'user' && secretWord)
            ) {
                content = <Game />;
            } else if(!secretWord) {
                content = <TypeInSecretWord />;
            }
        }

        return (
            <div className="container" data-test="component-app">
                { content }
            </div>
        );
    }
}

const mapStateToProps = ({modeChosen, secretWord, error}) => {
    return {
        modeChosen,
        secretWord,
        error
    }
};

export default connect(mapStateToProps)(UnconnectedApp);
