import React from 'react';

/*
    Props:
        text: string- the content to display
        classes: string- optional extra classes
    State:
        
*/
const Box = ({text, children, classes}) => {
    
    return(
        <div className={`box${' '+ classes || ""}`}>
            {text || children}
        </div>
    );
};

export default Box;