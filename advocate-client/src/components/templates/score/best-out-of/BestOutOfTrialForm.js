import React from "react";
import FormElement from "components/atoms/FormElement";
import Section from "components/atoms/Section";
import Box from "components/atoms/Box";
import ErrorLabel from "components/atoms/ErrorLabel";
import RequiredField from "components/atoms/RequiredField";

const BestOutOfTrialForm = ({track, setTrack, error}) => {
  return (
    <>
      <Section>
        <h3 className={"i-bottom"}><RequiredField/>Inputs</h3>
        <Box classes={"flex-center bestoutofcontainer"}>
          <FormElement
            type={"number"}
            placeholder={"Best"}
            value={track.best}
            onChange={e => setTrack({best: e.currentTarget.value === "" ? "" : parseInt(e.currentTarget.value)})}
          />
          <span className={"marg-left marg-right"}>/</span>
          <FormElement
            type={"number"}
            placeholder={"Out of"}
            value={track.outOf}
            onChange={e => setTrack({outOf: e.currentTarget.value === "" ? "" : parseInt(e.currentTarget.value)})}
          />
        </Box>
        {error ? <ErrorLabel text={error}/> : <></> }
      </Section>
    </>
  );
};

export default BestOutOfTrialForm;
