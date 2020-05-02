import React, {useState} from "react";
import NumberPicker from "../NumberPicker";
import Table from "../Table";

const ScoreTrial = (props) => {
    let track =  {item: "", success: false};

    const [trackingArray, setTracking] = useState([]);

    const updateTrack = (key, index, value) => {
        let newSt = JSON.parse(JSON.stringify(trackingArray));
        newSt = newSt.map((track, tIndex) => {
            console.log(track);
            if (index === tIndex)
                track[key] = (key === "success" ? !track[key] : value);
        });

        setTracking(newSt);
    };

    return (
        <div>
            <div className={"marg-bot-2"}><h2>Basic Score Trial</h2></div>
            <div className={"marg-bot-2"}>
                <div className={"marg-bot-2"}>
                    <h3 className={"i-bottom"}>Track Count</h3>
                    <NumberPicker updateState={setTracking} object={track} objectArray={trackingArray}/>
                </div>
                <Table headers={["Item", "Complete/Incomplete"]}>
                    <div>
                        {
                            trackingArray.map((track, index) => {
                                return (
                                    <div key={`trackingitem${index}`} className={"tr"}>
                                        <div className="td"><input onChange={(e) => {updateTrack("item", index, e.currentTarget.value)}} placeholder='Item Name' name='itemName'/></div>
                                        <div className="td">
                                            <div onClick={() => {updateTrack("success", index)}} className={"itemsuccess"}>
                                                <span>Successful?</span>
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
                <input type={"text"} placeholder={"Additional comments"} name={"comments"}/>
            </div>
            <div>
                <button className={"marg-right"} onClick={props.goBack}>Back to templates</button>
                <button>Submit Trial</button>
            </div>
        </div>
    );
};

export default ScoreTrial;