import React from "react";
import ScoreTrial from "components/molecules/ScoreTrial";
import TrialTemplateSelector from "components/molecules/TrialTemplateSelector";

const CreateTrial = ({benchmark, template, setTemplate, student, completeCrudOp}) => {

    const goBack = () => {
        setTemplate("");
    };

    const trialOptions = (type) => {
        return {
            "": <TrialTemplateSelector trackingType={benchmark.tracking} setTemplate={setTemplate}/>,
            "score": <ScoreTrial goBack={goBack} benchmark={benchmark} student={student} completeCrudOp={completeCrudOp}/>,
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