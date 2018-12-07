import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGameMode } from "./actions";

export class UnconnectedChooseMode extends Component {
    render() {
        return <div data-test="component-choose-mode">
            <h3>Choose mode for your game:</h3>
            <button
                className="btn btn-success btn-lg btn-block"
                data-test="choose-mode-button"
                onClick={() => this.props.setGameMode('random')}
            >
                Random
            </button>
            <button
                className="btn btn-warning btn-lg btn-block"
                data-test="choose-mode-button"
                onClick={() => this.props.setGameMode('user')}
            >
                User
            </button>
        </div>;
    }
}

const mapStateToProps = ({ modeChosen }) => {
    return { modeChosen };
};

export default connect(mapStateToProps, { setGameMode })(UnconnectedChooseMode);
