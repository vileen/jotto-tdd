import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startNewGame, getSecretWord } from "./actions";

export class UnconnectedNewGameButton extends Component {
    handleClick = event => {
        event.preventDefault();

        this.props.startNewGame();
        this.props.getSecretWord();
    };

    render() {
        if (!this.props.success && !this.props.givenUp) {
            return null;
        }

        return <button onClick={this.handleClick} className="btn btn-success">
            New Game
        </button>;
    }
}

const mapStateToProps = ({ success, givenUp }) => {
    return { success, givenUp }
};

export default connect(mapStateToProps, { startNewGame, getSecretWord })(UnconnectedNewGameButton);
