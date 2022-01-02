import React from 'react';
import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p style={{"text-align": "center"}}>
                <h2>Page doesn't exist</h2>
                <h3>Back to <Link to="/" style={{color: "#9F0013"}}>main page</Link></h3>
            </p>
        </div>
    );
};

export default Page404;