import React from "react";
import GetStarted from "./components/GetStarted";

class DashMain extends React.Component{
    render(){
        return(
            <div className={"dash-main-inner"}>
                <GetStarted to={"/dashboard/classroom/create"}>
                        <i className="fas fa-plus marg-bot"/>
                        <h2>Get started by creating a classroom</h2>
                </GetStarted>
            </div>
        )
    }

}

export default DashMain;