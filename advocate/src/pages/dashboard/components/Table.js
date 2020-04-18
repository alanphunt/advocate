import React from "react";

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: [],
            isFiltering: false,
            filterValues: ["", "", "", ""]
        };
        this.students = props.data;
    }

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
                opt.f = (student) => student.goalCount === parseInt(inputVal);
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
            filtered: this.students.filter(student => opt.f(student))
        }));
    };

    /*
    So if we send in data that means the table will take care of the rendering. If there is no data, it is assumed
    the parent to this component will add rows itself. If there is no data there shouldn't be more than 2 children
    passed into this, one for the header and one for the body.
     */
    render() {
        const filters = [
            <input type={"text"} value={this.state.filterValues[0]} placeholder={"Name"} onChange={(e) => {
                this.filterArray("name", e.currentTarget.value)}}/>,
            <input type={"text"} value={this.state.filterValues[1]} placeholder={"Goal #"} onChange={(e) => {
                this.filterArray("goal", e.currentTarget.value)}}/>,
            <input type={"text"} value={this.state.filterValues[2]} placeholder={"Eligibility"} onChange={(e) => {
                this.filterArray("eligibility", e.currentTarget.value)}}/>,
            <input type={"text"} value={this.state.filterValues[3]} placeholder={"Skill"} onChange={(e) => {
                this.filterArray("skills", e.currentTarget.value)}}/>
        ];
        const header = (h, i) => <div key={'classroomth'+i} className={"th"}>
            {h}
            {this.props.filterable && filters[i]}
        </div>;
        const studentHeader = ["Name", "Goal Count", "Eligibility", "Skills"].map((v, i) =>
            header(<h3 className={"i-bottom"}>{v}</h3>, i));


        //GOAL FOCUS READING COMPREHENSION, NUMBER IDENTIFICATION, CORRECT WORDS PER MINUTE

        return (
            <div className={"table"}>
                <div className={"theader"}>
                    <div className={"tcols tr"}>
                        {
                            this.props.studentTable === true
                            ? studentHeader.map(v => v)
                            : this.props.headers.map((head, index) => header(head, index))
                        }
                    </div>
                </div>
                <div className={"tbody"}>
                    {
                        this.students
                            ?  (this.state.isFiltering ? this.state.filtered : this.students).map((student, index) => {
                                    return (
                                        <div key={student.name + index} className={"tr"}>
                                            <div className={"td"}>{student.name}</div>
                                            <div className={"td"}>{student.goalCount}</div>
                                            <div className={"td"}>{student.eligibility}</div>
                                            <div className={"td"}>{student.skills}</div>
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