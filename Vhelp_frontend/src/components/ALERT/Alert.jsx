import React from 'react';

const Alert = (props) => {
    return (
        <div className='container'>
            <div className={`alert alert-${props.alert.type} text-center`} role="alert">
                <strong>{props.alert.message}</strong>
            </div>
        </div>
    );
}

export default Alert;
