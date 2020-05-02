import React from "react";
import GetStarted from "./components/GetStarted";
import ProfileCard from "./components/ProfileCard";
import Table from "./components/Table";

class DashMain extends React.Component{
    teacher = this.props.teacher;
    classrooms = this.props.teacher.classrooms || null;

    createClass = () => {
        return (
            <div className={"card width-100"}>
                <GetStarted to={"/dashboard/classroom/create"}>
                    <i className="fas fa-plus marg-bot"/>
                    <h2>Get started by creating a classroom</h2>
                </GetStarted>
            </div>
        )
    };


    render(){
        return(
            <div className={"dash-main-inner"}>
                <div className={"cardwrapperrow"}>
                    <ProfileCard teacher={this.teacher}/>
                    {
                       (this.classrooms.length === 0 && this.createClass())
                       || <div className={"card width-100"}>
                            <div className={"cardheader"}>
                                <h2>Classrooms</h2>
                            </div>
                            <div className={"cardmain"}>
                                <h2 className={"marg-bot"}>{this.teacher.classrooms[0].className}</h2>
                                <Table studentTable={true} data={this.teacher.classrooms[0].students}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default DashMain;