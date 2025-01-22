import React from 'react';

const NotFound = () => {
    return (
        <>
            <div className="not-found-container">
                <div className="not-found-content">
                    <h1 className="not-found-title">404</h1>
                    <p className="not-found-description">Oops! The page you're looking for does not exist.</p>
                    <span>go to <a href="/" className='not-found-homepage-link'>home page.</a></span>
                </div>
            </div>
        </>
    );
}

export default NotFound;