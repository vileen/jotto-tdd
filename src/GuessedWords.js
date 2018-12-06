import React from 'react';
import PropTypes from 'prop-types';

const guessedWords = props => {
    let contents;
    if (!props.guessedWords.length) {
        contents = <span data-test="guessed-instructions">
            Try to guess the secret word!
        </span>
    } else {
        const guessedWordsRows = props.guessedWords.map((word, index) => (
            <tr data-test="guessed-word" key={index}>
                <td>{index + 1}</td>
                <td>{word.guessedWord}</td>
                <td>{word.letterMatchCount}</td>
            </tr>
        ));
        contents = <div data-test="guessed-words">
            <h3>Guessed Words</h3>
            <table className="table table-sm">
                <thead className="thead-light">
                    <tr>
                        <th>#</th>
                        <th>Guess</th>
                        <th>Matching Letters</th>
                    </tr>
                </thead>
                <tbody>
                { guessedWordsRows }
                </tbody>
            </table>
        </div>
    }

    return (
        <div data-test="component-guessed-words">
            { contents }
        </div>
    )
};

guessedWords.propTypes = {
    guessedWords: PropTypes.arrayOf(
        PropTypes.shape({
            guessedWord: PropTypes.string.isRequired,
            letterMatchCount: PropTypes.number.isRequired
        })
    ).isRequired
};

export default guessedWords;
