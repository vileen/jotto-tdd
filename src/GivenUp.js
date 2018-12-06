import React, { Component } from 'react';
import { connect } from 'react-redux';

export class UnconnectedGivenUp extends Component {
    render() {
        const { givenUp, secretWord } = this.props;
        if (!givenUp) {
            return null;
        }

        return <div className="alert alert-danger">
            <div>The secret word was "{ secretWord }"</div>
            <div>Better luck next time!</div>
        </div>;
    }
}

const mapStateToProps = ({ givenUp, secretWord }) => {
    return {
        givenUp,
        secretWord
    }
};

export default connect(mapStateToProps)(UnconnectedGivenUp);
