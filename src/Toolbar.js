import React from "react";
import { Link } from "react-router-dom";
import { SaveIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';

function Toolbar({ save }) {
    return (
        <div className="Toolbar">
            <button className="newButton" onClick={save}>
                <SaveIcon />
            Save document.
            </button>
            <Link to={`${process.env.PUBLIC_URL}/`}>
                <button className="newButton">Return to all documents</button>
            </Link>
        </div>
    );
}

Toolbar.propTypes = {
    save: PropTypes.func.isRequired,
};

export default Toolbar;
