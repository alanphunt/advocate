import React from "react";

class NumberPicker extends React.Component {
    render() {
        let num = this.props.num;
        return (
            <div className={"numberpickerwrapper"}>
                <div className={`numbersub ${num === 0 ? 'disabled' : ''}`} onClick={this.props.subtract}><i className={"fas fa-minus posabs"}/></div>
                <div className={"numberinput"}><input placeholder={num} value={num} onChange={this.props.change} type={"text"}/></div>
                <div className={`numberadd ${num === 30 ? 'disabled' : ''}`} onClick={this.props.add}><i className={"fas fa-plus posabs"}/></div>
            </div>
        )
    }
}

export default NumberPicker;