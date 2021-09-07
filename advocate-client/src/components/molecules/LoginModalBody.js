import React from "react";
import ModalBody from "./ModalBody";
import CenteredForm from "./CenteredForm";
import Button from "../atoms/Button";
import LoginForm from "./LoginForm";

const LoginModalBody = ({errors, loginObject, updateLoginValues, handleFormSubmission}) => {
  
  return (
    <ModalBody
      header={"Welcome back!"}
      hideButtons
    >
      <CenteredForm>
        <LoginForm errors={errors} login={loginObject} updateLoginValues={updateLoginValues}/>
        <Button text={"Login"} onClick={handleFormSubmission} type="submit"/>
      </CenteredForm>
    </ModalBody>
  );
};

export default LoginModalBody;