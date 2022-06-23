import * as React from 'react';
import { Link } from 'react-router-dom';

export const PageNotFound: React.FunctionComponent<{}> = () => {
    return (
        <>
            <div>
                <h1>404 - Not Found!</h1>
                <Link to="/">Go Home</Link>
            </div>
        </>
    );
}; 