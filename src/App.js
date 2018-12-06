import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import { getSecretWord } from './actions';
import Input from "./Input";
import TotalGuesses from "./TotalGuesses";
import NewGameButton from './NewGameButton';
import GivenUp from './GivenUp';

export class UnconnectedApp extends Component {
    componentDidMount() {
        // get the secret word
        this.props.getSecretWord();
    }

    render() {
        const { success, guessedWords } = this.props;

        return (
            <div className="container" data-test="component-app">
                <h1>Jotto</h1>
                <GivenUp />
                <Congrats success={success}/>
                <NewGameButton />
                <Input />
                <GuessedWords guessedWords={guessedWords}/>
                <TotalGuesses totalGuesses={guessedWords.length}/>
            </div>
        );
    }
}

const mapStateToProps = ({success, guessedWords}) => {
    return {
        success,
        guessedWords
    }
};

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
