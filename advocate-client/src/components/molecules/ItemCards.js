import React from "react";
import {FaChartPie as PieIcon} from "react-icons/fa";

const ItemCards = ({trackingType, setTrialTemplate}) => {

    const items = (type) => {
        const item = (t, d, k) => {
            return {title: t, desc: d, key: k};
        };
        return {
            "score" : [
                item("Score Keeping",
                    "Choose this template for basic score keeping. Define a total, easily increment " +
                    "the student's score, and get the score and accuracy at the end.", "score"),
                item("Cue Counting",
                    "Choose this template for keeping track of how many times you " +
                    "assist the student with a certain cue.", "cue"),
                item("Words-per-minute",
                    "Keep count on the gross words-per-minute your student can read with a built in " +
                    "timer!", "wpm")
            ],
            "trial" : [{title: "No Templates", desc: "More templates coming soon!"}],
            "accuracy" : [{title: "No Templates", desc: "More templates coming soon!"}],
            "frequency" : [{title: "No Templates", desc: "More templates coming soon!"}],
            "other" : [{title: "No Templates", desc: "More templates coming soon!"}],
            "duration" : [{title: "No Templates", desc: "More templates coming soon!"}]
        }[type]
    }

    return (
        <div className={"itemcardwrapper"}>
            <div className={"itemcardcontainer"}>
                {
                    items(trackingType).map((item, index) => {
                        return (
                            <div key={`itemcard-${index}`} className={"itemcard"} onClick={() => setTrialTemplate(item.key)}>
                                <div className={"itemcardhead"}>
                                    <h2>
                                        <PieIcon className="itemcard-i"/>
                                        {item.title}
                                    </h2>
                                </div>
                                <div className={"itemcardmain"}>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default ItemCards;