import React, {useState} from "react";
import NumberPicker from "../NumberPicker";
import Table from "../Table";
import StudentInfoCard from "../StudentInfoCard";
import {FaPlus as PlusIcon, FaMinus as MinusIcon} from "react-icons/fa";


const ScoreTrial = ({goBack, benchmark, student}) => {
    let track =  {label: "", correct: 0};

    let [trialComments, setComments] = useState("");

    const [trackingArray, setTracking] = useState([]);

    const updateTrack = (key, index, value) => {
        let newSt = JSON.parse(JSON.stringify(trackingArray));
        newSt = newSt.map((track, tIndex) => {
            if (index === tIndex)
                track[key] = (key === "correct" ? (track[key] === 0 ? 1 : 0) : value);
            return track;
        });

        setTracking(newSt);
    };

    const createTracking = () => {
        let formData = new FormData();
        formData.append("comments", trialComments);
        formData.append("tracking", JSON.stringify(trackingArray));
        formData.append("benchmarkId", benchmark.id);
        fetch("/api/createtrial", {method: "POST", body: formData, headers: {"Authorization": `Bearer ${sessionStorage.authorization}`}})
            .then(r => r)
            .then(data => {
                console.log(data);
            });
    };

    return (
        <div className={"display"}>
            <div className={"width-50"}>
                <div className={"marg-bot-2"}>
                    <h2>Basic Score Trial</h2>
                </div>
                <div className={"marg-bot-2"}>
                    <div className={"marg-bot-2"}>
                        <h3 className={"marg-bot"}>Track Count</h3>
                        <NumberPicker updateState={setTracking} object={track} objectArray={trackingArray}/>
                    </div>
                    <Table headers={["Item Label", "Correct/Incorrect"]} subheaders={["(press Tab for next item)", "(press Enter to toggle)"]}>
                        <div>
                            {
                                trackingArray.map((track, index) => {
                                    return (
                                        <div key={`trackingitem${index}`} className={"tr"}>
                                            <div className="td">
                                                <input
                                                    onChange={(e) => {updateTrack("label", index, e.currentTarget.value)}}
                                                    onKeyPress={(e) => {
                                                        if(e.key === "Enter")
                                                            updateTrack("correct", index);
                                                    }}
                                                    placeholder='Item label'
                                                    name='itemName'/>
                                            </div>
                                            <div className="td">
                                                <div onClick={() => {updateTrack("correct", index)}} className={"itemsuccess"}>
                                                    <span><PlusIcon className={`marg-right comp-color ${trackingArray[index]?.correct === 1 ? "" : "grayscale"}`}/></span>
                                                    <span><MinusIcon className={`incomp-color ${trackingArray[index]?.correct === 1 ? "grayscale" : ""}`}/></span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Table>
                </div>
                <div className={"marg-bot-2"}>
                    <h3 className={"marg-bot"}>Trial Comments</h3>
                    <textarea
                        placeholder={"Additional comments"}
                        name={"comments"}
                        onChange={(e) => {setComments(e.currentTarget.value);}}
                    />
                </div>
                <div className={"marg-bot"}>
                    <button className={"marg-right"} onClick={goBack}>Back to templates</button>
                    <button onClick={createTracking}>Submit Trial</button>
                </div>
            </div>
            <div className={"width-50"}>
                <StudentInfoCard student={student} benchmark={benchmark}/>
            </div>
        </div>
    );
};

export default ScoreTrial;