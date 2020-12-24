import React from "react";
import {FaChartPie as PieIcon} from "react-icons/fa";

const ItemCards = (props) => {

    const handleSelected = (template) => {
        props.selectedTemplate(template);
    };

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
            "duration" : [{title: "No Templates", desc: "More templates coming soon!"}]
        }[type]
    }

    return (
        <div className={"itemcardwrapper"}>
            <div className={"itemcardcontainer"}>
                {
                    items(props.type).map((item, index) => {
                        return (
                            <div key={`itemcard${index}`} className={"itemcard"} onClick={() => {handleSelected(item.key)}}>
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