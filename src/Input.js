import React, { Component } from 'react';
import { connect } from 'react-redux';

import { guessWord } from "./actions";

export class UnconnectedInput extends Component {
    state = {
        value: ''
    };

    handleInputChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleClick = event => {
        event.preventDefault();
        console.log(this.state.value);
        if (this.state.value) {
            this.props.guessWord(this.state.value);
        }
    };

    render() {
        let contents = this.props.success ? null : <form className="form-inline">
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
                onClick={this.handleClick}
            >
                Submit
            </button>
        </form>;

        return <div data-test="component-input">
            { contents }
        </div>;
    }
}

const mapStateToProps = ({success}) => {
    return { success };
};

export default connect(mapStateToProps, { guessWord })(UnconnectedInput);
