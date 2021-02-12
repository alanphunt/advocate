import React from "react";
import FormElement from "components/atoms/FormElement";
import Section from "components/atoms/Section";
import Box from "components/atoms/Box";
import ErrorLabel from "components/atoms/ErrorLabel";
import RequiredField from "components/atoms/RequiredField";

const BestOutOfTrialForm = ({best, setBest, outOf, setOutOf, error}) => {
  return (
    <>
      <Section>
        <h3 className={"i-bottom"}><RequiredField/>Inputs</h3>
        <Box classes={"flex-center bestoutofcontainer"}>
          <FormElement
            type={"number"}
            placeholder={"Best"}
            value={best}
            onChange={e => setBest(parseInt(e.currentTarget.value))}
          />
          <span className={"marg-left marg-right"}>/</span>
          <FormElement
            type={"number"}
            placeholder={"Out of"}
            value={outOf}
            onChange={e => setOutOf(parseInt(e.currentTarget.value))}
          />
        </Box>
        {error ? <ErrorLabel text={error}/> : <></> }
      </Section>
    </>
  );
};

export default BestOutOfTrialForm;
