import React, { Component } from 'react';
import { connect } from 'react-redux';

import {giveUp, guessWord} from "./actions";

export class UnconnectedInput extends Component {
    state = {
        value: ''
    };

    handleInputChange = event => {
        this.setState({
            value: event.target.value
        });
    };

    handleGuessClick = event => {
        event.preventDefault();
        if (this.state.value) {
            this.props.guessWord(this.state.value);
            this.setState({
                value: ''
            })
        }
    };

    handleGiveUpClick = event => {
        event.preventDefault();
        this.props.giveUp();
    };

    render() {
        let contents = this.props.success || this.props.givenUp ? null : <form className="form-inline">
            <input
                type="text"
                data-test="input-box"
                className="mb-2 mx-sm-3"
                id="word-guess"
                placeholder="enter guess"
                value={this.state.value}
                onChange={this.handleInputChange}
            />
            <button
                type="submit"
                data-test="submit-button"
                className="btn btn-primary mb-2"
                onClick={this.handleGuessClick}
            >
                Guess
            </button>
            <button
                type="button"
                data-test="give-up-button"
                className="btn btn-danger mb-2"
                onClick={this.handleGiveUpClick}
            >
                Give up
            </button>
        </form>;

        return <div data-test="component-input">
            { contents }
        </div>;
    }
}

const mapStateToProps = ({success, givenUp}) => {
    return { success, givenUp };
};

export default connect(mapStateToProps, { guessWord, giveUp })(UnconnectedInput);
