import React from 'react';

/**
 * Functional react component for congratulatory message
 * @function
 * @param {object} props - React props
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is null)
 */
const congrats = props => {
    if (props.success) {
        return <div data-test="component-congrats">
            <span data-test="congrats-message">
                Congratulations! You guessed the word!
            </span>
        </div>;
    }

    return <div data-test="component-congrats" />
};

export default congrats;
