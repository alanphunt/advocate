import React from "react";
import { BASIC_STUDENT_TABLE_HEADERS } from "utils/constants";

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: [],
            isFiltering: false,
            filterValues: props.headers?.map(v => "") || ["", "", "", ""]
        };
    }

    //should be updated to be able to filter whatever columns are provided to the comopnent
    filterArray = (type, inputVal) => {
        let opt = {};
        switch(type){
            case "name":
                opt.t = type;
                opt.i = 0;
                opt.f = (student) => student.name.toLowerCase().includes(inputVal.toLowerCase());
                break;
            case "goal":
                opt.t = type;
                opt.i = 1;
                opt.f = (student) => student.goalFocus.toLowerCase().includes(inputVal.toLowerCase());
                break;
            case "eligibility":
                opt.t = type;
                opt.i = 2;
                opt.f = (student) => student.eligibility.toLowerCase().includes(inputVal.toLowerCase());
                break;
            case "skills":
                opt.t = type;
                opt.i = 3;
                opt.f = (student) => student.skills.toLowerCase().includes(inputVal.toLowerCase());
                break;
            default: break;
        }
        this.setState( state => ({
            isFiltering: inputVal !== "",
            filterValues: state.filterValues.map((value, index) => {
                if(type === opt.t && index === opt.i)
                    return inputVal;
                return "";
            }),
            filtered: this.props.data.filter(student => opt.f(student))
        }));
    };

    handleSelect = (student, index) => {
        this.props.selectedCallback(student, index);
    };

    render() {
        const filters = [
            <input className={"i-top"} type={"text"} value={this.state.filterValues[0]} placeholder={"Name"} onChange={(e) => {
                this.filterArray("name", e.currentTarget.value)}}/>,
            <input className={"i-top"} type={"text"} value={this.state.filterValues[1]} placeholder={"Goal #"} onChange={(e) => {
                this.filterArray("goal", e.currentTarget.value)}}/>,
            <input className={"i-top"} type={"text"} value={this.state.filterValues[2]} placeholder={"Eligibility"} onChange={(e) => {
                this.filterArray("eligibility", e.currentTarget.value)}}/>,
            <input className={"i-top"} type={"text"} value={this.state.filterValues[3]} placeholder={"Skill"} onChange={(e) => {
                this.filterArray("skills", e.currentTarget.value)}}/>
        ];
        const mainStudentKeys = ["name", "goalFocus", "eligibility", "skills"];
        const header = (head, i) => <div key={'classroomth'+i} className={"th"}>
            <h3>{head}</h3>
            {
                this.props.subheaders
                  ? <p>{this.props.subheaders[i]}</p>
                  : <></>
            }
            {this.props.filterable && filters[i]}
        </div>;
        const studentHeader = BASIC_STUDENT_TABLE_HEADERS.map((v, i) => header(v, i));


        return (
            <div className={"table"}>
                <div className={"theader"}>
                    {
                        this.props.studentTable || this.props.headers
                         ? <div className={"tcols tr"}>
                            {
                                this.props.studentTable === true
                                    ? studentHeader.map(v => v)
                                    : this.props.headers.map((head, index) => header(head, index))
                            }
                        </div>
                         : <></>
                    }
                </div>
                <div className={"tbody"}>
                    {
                        this.props.data
                            ?  (this.state.isFiltering ? this.state.filtered : this.props.data).map((student, index) => {
                                let includesIndex = this.props.selectedRowIndexes?.length ? this.props.selectedRowIndexes.includes(index) : this.props.selectedRowIndexes === index;
                                let rowClassName = `tr ${this.props.selectedCallback ? "selectable" : ""} ${includesIndex ? "selected-bg" : ""}`;
                                    return (
                                        <div
                                            key={`${student.name}${index}`}
                                            className={rowClassName}
                                            onClick={this.props.selectedCallback ? () => {this.handleSelect(student, index)} : null}>
                                            {
                                                this.props.studentTable
                                                    ? mainStudentKeys.map((key, ind) =>
                                                        <div key={`tableTD${key}${ind}`} className={"td"}>{student[key]}</div>
                                                    )
                                                    : Object.keys(student).map((key, ind) =>
                                                        <div key={`tableTD${key}${ind}`} className={`td ${key === "icon" ? "td-icon" : ""}`}>
                                                            {student[key]}
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    )
                                })
                            :   <div>
                                    {this.props.children.props.children}
                                </div>
                    }
                </div>
            </div>
        )
    }
}

export default Table;