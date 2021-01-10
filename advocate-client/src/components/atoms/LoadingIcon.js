import React from "react";
import favicon from 'images/favicon.png'

/*
     props:

     state:

*/

const LoadingIcon = () => {

    return (
        <div className="posabs">
            <img src={favicon} alt="Loading.." className="loading-icon-spinner"/>
        </div>
    )

};

export default LoadingIcon;
