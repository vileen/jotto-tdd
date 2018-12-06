import React from 'react';
import PropTypes from 'prop-types';

const totalGuesses = props => <div>Total guesses: {props.totalGuesses}</div>;

totalGuesses.propTypes = {
    totalGuesses: PropTypes.number.isRequired
};

export default totalGuesses;
