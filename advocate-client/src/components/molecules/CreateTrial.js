import React, {useEffect, useState} from "react";
import TrialTemplateSelector from "components/molecules/TrialTemplateSelector";
import CreateScoreTrial from "./CreateScoreTrial";

const CreateTrial = ({benchmark, studentName, completeCrudOp, goalName, isLoading, setIsLoading}) => {
  const [trialTemplate, setTrialTemplate] = useState("");

  const goBack = () => {
    setIsLoading({"": false});
    setTrialTemplate("");
  }

  useEffect(goBack, [])

  const trialOptions = () => {
    return {
      "": <TrialTemplateSelector trackingType={benchmark.tracking} setTrialTemplate={setTrialTemplate}/>,
      "score": <CreateScoreTrial goBack={goBack} benchmark={benchmark} studentName={studentName} goalName={goalName} completeCrudOp={completeCrudOp} isLoading={isLoading} setIsLoading={setIsLoading}/>,
      "cue": cueTrial(goBack),
      "wpm": wpmTrial(goBack)
    }[trialTemplate];
  };

  const cueTrial = (goBack) => {
    return <div onClick={goBack}>cue</div>;
  };

  const wpmTrial = (goBack) => {
    return <div onClick={goBack}>wpmtrial</div>;
  };

  return (
    <div className={"createtrialwrapper"}>
      {trialOptions()}
    </div>
  )
};


export default CreateTrial;