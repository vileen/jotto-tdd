import React, { Component } from 'react';
import { connect } from 'react-redux';

import {typeSecretWord} from "./actions";

export class UnconnectedTypeInSecretWord extends Component {
    state = {
        value: ''
    };

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    };

    handleClick = event => {
        event.preventDefault();

        if (this.state.value) {
            this.props.typeSecretWord(this.state.value);
        }
    };

    render() {
        return <form data-test="component-type-in-secret-word">
            <div className="form-group">
                <label htmlFor="type-in-secret-word">Type in secret word</label>
                <input
                    type="text"
                    data-test="secret-word-input"
                    id="type-in-secret-word"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.value}
                />
            </div>
            <button
                className="btn btn-primary"
                onClick={this.handleClick}
                data-test="secret-word-submit-button"
                type="submit"
            >
                Submit
            </button>
        </form>
    }
}

export default connect(null, { typeSecretWord })(UnconnectedTypeInSecretWord);
