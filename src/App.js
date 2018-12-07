import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import Game from "./Game";
import ChooseMode from './ChooseMode';
import TypeInSecretWord from "./TypeInSecretWord";

export class UnconnectedApp extends Component {
    render() {
        let content = <ChooseMode />;
        if (this.props.modeChosen) {
            if (
                this.props.modeChosen === 'random' ||
                (this.props.modeChosen === 'user' && this.props.secretWord)
            ) {
                content = <Game />;
            } else if(!this.props.secretWord) {
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

const mapStateToProps = ({modeChosen, secretWord}) => {
    return {
        modeChosen,
        secretWord
    }
};

export default connect(mapStateToProps)(UnconnectedApp);
