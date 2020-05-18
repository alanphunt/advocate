import React from "react";
import ScoreTrial from "./Trials/ScoreTrial";
import TrialTemplateSelector from "./Trials/TrialTemplateSelector";

const CreateTrial = ({benchmark, template, setTemplate, student}) => {

    const goBack = () => {
        setTemplate("");
    };

    const trialOptions = (type) => {
        return {
            "": <TrialTemplateSelector benchmark={benchmark} setTemplate={setTemplate}/>,
            "score": <ScoreTrial goBack={goBack} benchmark={benchmark} student={student}/>,
            "cue": cueTrial(goBack),
            "wpm": wpmTrial(goBack)
        }[type];
    };

    return (
        <div className={"createtrialwrapper"}>
            {
                benchmark
                ? trialOptions(template)
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