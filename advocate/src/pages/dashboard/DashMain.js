import React from "react";
import GetStarted from "./components/GetStarted";
import ProfileCard from "./components/ProfileCard";
import Table from "./components/Table";
import Accordion from "./components/accordion/Accordion";

class DashMain extends React.Component{
    teacher = this.props.teacher;
    classrooms = this.props.teacher.classrooms || null;

    createClass = () => {
        return (
            <div className={"card width-100"}>
                <GetStarted to={"/dashboard/classroom/create"}>
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
                                <Accordion
                                    onlyFirstOpen={true}
                                    array={this.teacher.classrooms}
                                    data={this.teacher.classrooms.map(cr => cr.className)}
                                >
                                    {
                                        this.teacher.classrooms.map((cr, crInd) =>
                                            <Table
                                                studentTable={true}
                                                key={`dashmaintable${crInd}`}
                                                data={cr.students}
                                            />
                                        )
                                    }
                                </Accordion>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default DashMain;