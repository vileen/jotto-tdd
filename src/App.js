import React, {Component} from 'react';
import { connect } from 'react-redux';

import './App.css';
import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import { getSecretWord } from './actions';
import Input from "./Input";

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
                <Congrats success={success}/>
                <Input />
                <GuessedWords guessedWords={guessedWords}/>
            </div>
        );
    }
}

const mapStateToProps = ({success, guessedWords, secretWord}) => {
    return {
        success,
        guessedWords,
        secretWord
    }
};

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
