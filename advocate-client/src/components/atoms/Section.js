import React from 'react';

/*
    Props:
        children: objects- the children to render
        classes: string: optional- additional classes        
*/
const Section = ({children, classes}) => {
    
    return(
        <div className={`marg-bot-2 ${classes || ""}`}>
            {children}
        </div>
    );
};

export default Section;