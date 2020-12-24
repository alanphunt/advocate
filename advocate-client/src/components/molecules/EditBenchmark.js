import React from "react";
import {
    FaCalendarCheck as CalCheckIcon,
    FaCommentDots as DotsIcon,
    FaRulerCombined as RulerIcon
} from "react-icons/fa";

const EditBenchmark = ({benchmark, updateBenchmark}) => {

    const editBenchmark = (e, key) => {
        updateBenchmark({...benchmark, [key]: e.target.value});
    };

    return (
        <div className={""}>
            <div className={"marg-bot-2"}>
                <h3 className={"i-bottom"}>Description</h3>
                <label>
                    <DotsIcon className={"label-i"}/>
                    <input placeholder={"Benchmark"} type={"text"} value={benchmark.description} onChange={(e) => {editBenchmark(e, "description")}}/>
                </label>
            </div>

            <div className={"marg-bot-2"}>
                <h3 className={"i-bottom"}>Projected mastery date</h3>
                <label>
                    <CalCheckIcon className={"label-i"}/>
                    <input placeholder={"MM/DD/YYYY"} type={"text"} value={benchmark.masteryDate} onChange={(e) => {editBenchmark(e, "masteryDate")}}/>
                </label>
            </div>

            <div className={"marg-bot-2"}>
                <h3 className={"i-bottom"}>Tracking Type</h3>
                <label>
                    <RulerIcon className={"label-i"}/>
                    <select value={benchmark.tracking} onChange={(e) => {editBenchmark(e, "tracking")}}>
                        <option>Select a type..</option>
                        <option value={"score"}>Score/Accuracy</option>
                        <option value={"trial"}>Trial/Frequency</option>
                        <option value={"duration"}>Duration</option>
                    </select>
                </label>
            </div>
        </div>
    )
};

export default EditBenchmark;