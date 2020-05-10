import React, {useState} from "react";
import NumberPicker from "../NumberPicker";
import Table from "../Table";

const ScoreTrial = (props) => {
    let track =  {item: "", success: false};

    let [trialComments, setComments] = useState("");

    const [trackingArray, setTracking] = useState([]);

    const updateTrack = (key, index, value) => {
        let newSt = JSON.parse(JSON.stringify(trackingArray));
        newSt = newSt.map((track, tIndex) => {
            if (index === tIndex)
                track[key] = (key === "success" ? !track[key] : value);
            return track;
        });

        setTracking(newSt);
    };

    const createTracking = () => {
        let formData = new FormData();
        formData.append("comments", trialComments);
        formData.append("tracking", JSON.stringify(trackingArray));
        fetch("/api/createtrial", {method: "POST", body: formData})
            .then(r => r)
            .then(data => {
                console.log(data);
            });
    };

    return (
        <div>
            <div className={"marg-bot-2"}><h2>Basic Score Trial</h2></div>
            <div className={"marg-bot-2"}>
                <div className={"marg-bot-2"}>
                    <h3 className={"marg-bot"}>Track Count</h3>
                    <NumberPicker updateState={setTracking} object={track} objectArray={trackingArray}/>
                </div>
                <Table headers={["Item", "Complete/Incomplete"]}>
                    <div>
                        {
                            trackingArray.map((track, index) => {
                                return (
                                    <div key={`trackingitem${index}`} className={"tr"}>
                                        <div className="td">
                                            <input
                                                onChange={(e) => {updateTrack("item", index, e.currentTarget.value)}}
                                                onKeyPress={(e) => {
                                                    if(e.key === "Enter")
                                                        updateTrack("success", index);
                                                }}
                                                placeholder='Item Name'
                                                name='itemName'/>
                                        </div>
                                        <div className="td">
                                            <div onClick={() => {updateTrack("success", index)}} className={"itemsuccess"}>
                                                <span>Success</span>
                                                <i className={`i-left fa-star ${trackingArray[index]?.success ? "golden fas" : "far"}`}/>
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
                <button className={"marg-right"} onClick={props.goBack}>Back to templates</button>
                <button onClick={createTracking}>Submit Trial</button>
            </div>
        </div>
    );
};

export default ScoreTrial;