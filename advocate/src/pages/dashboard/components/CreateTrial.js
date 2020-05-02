import React, {useState} from "react";
import ScoreTrial from "./Trials/ScoreTrial";
import TrialTemplateSelector from "./Trials/TrialTemplateSelector";

const CreateTrial = (props) => {

    const goBack = () => {
        props.setTemplate("");
    };

    const trialOptions = (type) => {
        return {
            "": <TrialTemplateSelector benchmark={props.benchmark} setTemplate={props.setTemplate}/>,
            "score": <ScoreTrial goBack={goBack}/>,
            "cue": cueTrial(goBack),
            "wpm": wpmTrial(goBack)
        }[type];
    };

    return (
        <div className={"createtrialwrapper"}>
            {
                props.benchmark
                ? trialOptions(props.template)
                : <p>No benchmark selected!</p>
            }
        </div>
    )
};

const cueTrial = (goBack) => {
    return <div onClick={goBack}>cue</div>;
};

const wpmTrial = (goBack) => {
    return <div onClick={goBack}>wpmtrial</div>;
};

export default CreateTrial;