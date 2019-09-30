import React from 'react';
import PropTypes from 'prop-types';

const Error = ({mensaje}) => {
    console.log('el mensaje ' , mensaje);
    return (
        <p className="alert alert-danger p3 my-1 text-center text-uppercase font-weight-bold">
            {mensaje}
        </p> 
    );
}


Error.propTypes = {
    mensaje : PropTypes.string.isRequired
}

export default Error;
