import React from 'react';

const TemplateFrame = ({children}) => {
    return (
        <div className={"display"}>
            {children}
        </div>
    );
};

export default TemplateFrame;