import React from "react";

const CenteredForm = ({children}) => {
  
  return (
    <div className="formcontainer">
      <form className={"centeredform"}>
        {children}
      </form>
    </div>
  );
};

export default CenteredForm;