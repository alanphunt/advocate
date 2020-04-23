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
                opt.f = (student) => student.goalFocus.includes(inputVal.toLowerCase());
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

    handleSelect = (e, student) => {
        e.currentTarget.classList.toggle("selected-bg");
            this.props.selectedCallback(e.currentTarget.classList.contains("selected-bg"), student);
    };

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
        const header = (head, i) => <div key={'classroomth'+i} className={"th"}>
            <h3 className={"i-bottom"}>{head}</h3>
            {this.props.filterable && filters[i]}
        </div>;
        const studentHeader = ["Name", "Goal Focus", "Eligibility", "Skills"].map((v, i) =>
            header(v, i));


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
                                        <div key={student.name + index}
                                             className={"tr " + (this.props.selectable && "selectable")}
                                             onClick={this.props.selectable ? (e)=>{this.handleSelect(e, student)} : null}
                                        >
                                            <div className={"td"}>{student.name}</div>
                                            <div className={"td"}>{student.goalFocus}</div>
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