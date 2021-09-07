import React from "react";
import ModalBody from 'components/molecules/ModalBody';
import CenteredForm from "./CenteredForm";
import Button from "../atoms/Button";
import RegisterForm from "./RegisterForm";

const RegisterModalBody = ({errors, registrationObject, updateRegistrationValues, handleFormSubmission}) => {
  
  return (
    <ModalBody
      header={"Let's get you started."}
      hideButtons
    >
      <CenteredForm>
        <RegisterForm errors={errors} register={registrationObject} updateRegistrationValues={updateRegistrationValues}/>
        <Button text={"Register"} onClick={handleFormSubmission} type="submit"/>
      </CenteredForm>
    </ModalBody>
  );
};

export default RegisterModalBody;