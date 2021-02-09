import React, {useEffect, useState, Suspense} from "react";
import TrialTemplateCards from "components/molecules/TrialTemplateCards";
import {TEMPLATE_TYPES} from "components/templates/TemplateList";
import TemplateLoadingPlaceholder from "../atoms/TemplateLoadingPlaceholder";

const CreateBasicScoreTrial = React.lazy(() => import("./score/CreateBasicScoreTrial"));

const CreateTrial = ({benchmark, studentName, completeCrudOp, goalName, isLoading, setIsLoading}) => {
    const [trialTemplate, setTrialTemplate] = useState("");

    const goBack = () => setTrialTemplate("");

    useEffect(() => {
        return () => setTrialTemplate("");
    }, [])

    const trialOptions = () => {
        return {
            "": <TrialTemplateCards trackingType={benchmark.tracking} setTrialTemplate={setTrialTemplate}/>,
            [TEMPLATE_TYPES.SCORE_BASIC]: <CreateBasicScoreTrial template={trialTemplate} goBack={goBack} benchmark={benchmark} studentName={studentName} goalName={goalName} completeCrudOp={completeCrudOp} isLoading={isLoading} setIsLoading={setIsLoading}/>,
            [TEMPLATE_TYPES.SCORE_CUE]: cueTrial(goBack),
            [TEMPLATE_TYPES.SCORE_WPM]: wpmTrial(goBack)
        }[trialTemplate];
    };

    const cueTrial = (goBack) => {
        return <div onClick={goBack}>cue</div>;
    };

    const wpmTrial = (goBack) => {
        return <div onClick={goBack}>wpmtrial</div>;
    };

    return (
        <Suspense fallback={<TemplateLoadingPlaceholder/>}>
            <div className={"createtrialwrapper"}>
                {trialOptions()}
            </div>
        </Suspense>
    )
};


export default CreateTrial;