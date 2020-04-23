import React from 'react';
import Table from "./components/Table";


//if they have multiple classrooms then each table should have the name at the top and act as an accordion

class Classroom extends React.Component{
    constructor(props) {
        super(props);
        this.students = this.props.teacher.classrooms[0]?.students || null;
    }


    render() {
        if(this.students)
            return (
                <div className={"dash-main-inner"}>
                    <div className={"card width-100"}>
                        <div className={"cardheader"}>
                            <h2>Classrooms</h2>
                        </div>
                        <div className={"cardmain"}>
                            <h2 className={"marg-bot"}>{this.props.teacher.classrooms[0].className}</h2>
                            <Table data={this.students} filterable={true} studentTable={true}/>
                        </div>
                    </div>
                </div>
            );
        else
            {window.location = "/dashboard/classroom/create";}
    }
}

export default Classroom;
