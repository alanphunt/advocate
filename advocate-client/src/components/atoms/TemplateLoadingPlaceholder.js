import React from "react";
import "css/placeholder-loading/placeholder-loading.scss";

const TemplateLoadingPlaceholder = () => {
    return (
        <div className="ph-item">
            <div className="ph-col-5 marg-right template-placeholder-height">
                <div className="ph-picture"/>
            </div>
            <div className="ph-col-5">
                <div className="ph-picture template-placeholder-height"/>
            </div>
        </div>
    );
};

export default TemplateLoadingPlaceholder;
