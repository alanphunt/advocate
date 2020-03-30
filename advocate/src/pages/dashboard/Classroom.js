import React from 'react';

class Classroom extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            students: [
                {name: "A. Hunt", goals: "2", eligibility: "doesn't listen", casemanager: 'Allison Schiller', skills: 'communications'},
                {name: "M. Jones", goals: "1", eligibility: "doesn't talk", casemanager: 'Chip Gaines', skills: 'speech therapy'},
                {name: "Z. Smith", goals: "2", eligibility: "is a dinosaur", casemanager: 'Allison Schiller', skills: 'study habits'},
                {name: "L. Croft", goals: "4", eligibility: "can't focus", casemanager: 'Alan Hunt', skills: 'numchucks'}
            ],
            filtered: this.students,
            isFiltering: false,
            filterValues: ["", "", "", "", ""]
        };
        this.filterArray = this.filterArray.bind(this);
    }

    filterArray = (type, how) => {
        let opt = {};
        switch(type){
            case "name":
                opt.t = type;
                opt.i = 0;
                opt.f = (student) => student.name.toLowerCase().includes(how.toLowerCase());
                break;
            case "goal":
                opt.t = type;
                opt.i = 1;
                opt.f = (student) => student.goals === how;
                break;
            case "eligibility":
                opt.t = type;
                opt.i = 2;
                opt.f = (student) => student.eligibility.toLowerCase().includes(how.toLowerCase());
                break;
            case "case":
                opt.t = type;
                opt.i = 3;
                opt.f = (student) => student.casemanager.toLowerCase().includes(how.toLowerCase());
                break;
            case "skills":
                opt.t = type;
                opt.i = 4;
                opt.f = (student) => student.skills.toLowerCase().includes(how.toLowerCase());
                break;
            default: break;
        }
        this.setState({
            isFiltering: how !== "",
            filterValues: this.state.filterValues.map((value, index) => {
               if(type === opt.t && index === opt.i)
                    return how;

                    return "";
            })
        });

        this.setState(state => ({
            filtered: state.students.filter(student => opt.f(student))
        }));
    };

    render() {
        return (
            <div className={"dash-main-inner"}>
                <div className={"tablewrapper card"}>
                    <div className={"cardheader"}>
                        <h2>Classroom</h2>
                    </div>
                    <div className={"table"}>
                        <div className={"theader"}>
                            <div className={"tcols tr"}>
                                <div className={"th"}>
                                    <h3>Name</h3>
                                </div>
                                <div className={"th"}>
                                    <h3>Goals</h3>
                                </div>
                                <div className={"th"}>
                                    <h3>Eligibility</h3>
                                </div>
                                <div className={"th"}>
                                    <h3>Case Manager</h3>
                                </div>
                                <div className={"th"}>
                                    <h3>Skills</h3>
                                </div>
                            </div>
                            <div className={"tfilters tr"}>
                                <div className={"th"}><input type={"text"} value={this.state.filterValues[0]} placeholder={"Name"} onChange={(e) => {
                                    this.filterArray("name", e.currentTarget.value);
                                }}/></div>
                                <div className={"th"}><input type={"text"} value={this.state.filterValues[1]} placeholder={"Goal #"} onChange={(e) => {
                                    this.filterArray("goal", e.currentTarget.value)
                                }}/></div>
                                <div className={"th"}><input type={"text"} value={this.state.filterValues[2]} placeholder={"Eligibility"} onChange={(e) => {
                                    this.filterArray("eligibility", e.currentTarget.value)
                                }}/></div>
                                <div className={"th"}><input type={"text"} value={this.state.filterValues[3]} placeholder={"Case Manager"} onChange={(e) => {
                                    this.filterArray("case", e.currentTarget.value)
                                }}/></div>
                                <div className={"th"}><input type={"text"} value={this.state.filterValues[4]} placeholder={"Skill"} onChange={(e) => {
                                    this.filterArray("skills", e.currentTarget.value)
                                }}/></div>
                            </div>
                        </div>
                        <div className={"tbody"}>
                            {
                                (this.state.isFiltering ? this.state.filtered : this.state.students).map((student, index) => {
                                    return (
                                        <div key={student.name + index} className={"tr"}>
                                            <div className={"td"}>{student.name}</div>
                                            <div className={"td"}>{student.goals}</div>
                                            <div className={"td"}>{student.eligibility}</div>
                                            <div className={"td"}>{student.casemanager}</div>
                                            <div className={"td"}>{student.skills}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Classroom;
