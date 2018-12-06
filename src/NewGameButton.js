import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { startNewGame, getSecretWord } from "./actions";

export class UnconnectedNewGameButton extends Component {
    handleClick = event => {
        event.preventDefault();

        this.props.startNewGame();
        this.props.getSecretWord();
    };

    render() {
        if (!this.props.success) {
            return null;
        }

        return <button onClick={this.handleClick} className="btn btn-success">
            New Game
        </button>;
    }
}

UnconnectedNewGameButton.propTypes = {
    success: PropTypes.bool.isRequired,
    startNewGame: PropTypes.func.isRequired,
    getSecretWord: PropTypes.func.isRequired
};

export default connect(undefined, { startNewGame, getSecretWord })(UnconnectedNewGameButton);
