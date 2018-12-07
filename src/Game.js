import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from "./Input";
import TotalGuesses from "./TotalGuesses";
import NewGameButton from './NewGameButton';
import GivenUp from './GivenUp';
import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import { getSecretWord } from "./actions";

export class UnconnectedGame extends Component {
    componentDidMount() {
        // get the secret word
        if (this.props.modeChosen === 'random') {
            this.props.getSecretWord();
        }
    }

    render() {
        const { success, guessedWords } = this.props;

        return <div data-test="component-game">
            <h1>Jotto</h1>
            <GivenUp />
            <Congrats success={success}/>
            <NewGameButton />
            <Input />
            <GuessedWords guessedWords={guessedWords}/>
            <TotalGuesses totalGuesses={guessedWords.length}/>
        </div>;
    }
}

const mapStateToProps = ({success, guessedWords, modeChosen}) => {
    return {
        success,
        guessedWords,
        modeChosen
    }
};

export default connect(mapStateToProps, { getSecretWord })(UnconnectedGame);