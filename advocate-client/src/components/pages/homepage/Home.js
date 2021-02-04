import React, {useState, useEffect} from 'react';
import logo from 'images/logo-sm-wht.png'
import {
    FaUser as UserIcon,
    FaUserPlus as UserPlusIcon,
    FaRegPaperPlane as PlaneIcon,
    FaRegFileArchive as BriefcaseIcon,
    FaRegHourglass as HourglassIcon,
    FaRegMap as MapIcon,
    FaRegHandPeace as PeaceIcon,
    FaCheckCircle as HandIcon

} from "react-icons/fa";
import Button from 'components/atoms/Button';
import LoginForm from 'components/molecules/LoginForm';
import RegisterForm from 'components/molecules/RegisterForm';
import { homepageErrorModel, loginModel, registrationModel } from 'utils/models';
import { useAuth } from 'utils/auth/AuthHooks';
import ModalBody from 'components/molecules/ModalBody';
import Modal from "components/molecules/Modal";

const Home = ({setIsFetching}) => { 
    const {signin, register} = useAuth();
    const [loginObject, setLoginObject] = useState(loginModel);
    const [registrationObject, setRegistrationObject] = useState(registrationModel);
    const [errors, setErrors] = useState(homepageErrorModel);

    const [modalBody, setModalBody] = useState(null);
    const [modalAction, setModalAction] = useState("");
    const closeModal = () => setModalBody(null);

    const resetForms = () => {
        setLoginObject(loginModel);
        setRegistrationObject(registrationModel);
        setErrors(homepageErrorModel);
    };

    useEffect(() => {
        if(modalAction !== ""){
            setModalBody(                
                <ModalBody
                    header={modalAction === "login" ? "Welcome back!" : "Let's get you started."}
                    hideButtons
                >
                    <div className="formcontainer">
                        <form className={"centeredform"} >
                            {
                                modalAction === "login"
                                ? <LoginForm errors={errors} login={loginObject} updateFormValues={updateFormValues}/>
                                : modalAction === "register"
                                    ? <RegisterForm errors={errors} register={registrationObject} updateFormValues={updateFormValues}/>
                                    : <></>
                            }
                            <Button text={modalAction === "login" ? "Login" : "Register"} onClick={handleFormSubmission} type="submit"/>
                        </form>
                    </div>
                </ModalBody>
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalAction, loginObject, registrationObject, errors])

    useEffect(() => {
        if(!modalBody){
            resetForms();
            setModalAction("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalBody])

    const handleFormSubmission = (e) => {
        e.preventDefault();
        setIsFetching(true);
        const isLoginForm = modalAction === "login";
        const data = isLoginForm ? loginObject : registrationObject;
        isLoginForm 
            ?  signin(data, setErrors, () => setIsFetching(false), () => setIsFetching(false))
            :  register(data, setErrors, () => setIsFetching(false), () => setIsFetching(false))
    };

    const divKeyPressEvent = (event, formType) => {
        if(event.key === "Enter")
            setModalAction(formType);
    };

    const updateFormValues = (e, key) => {
        if(modalAction === "login")
            setLoginObject({...loginObject, [key]: e.currentTarget.value});
        else
            setRegistrationObject({...registrationObject, [key]: e.currentTarget.value})
    };

    return (
        <div className={"width-100 height-100"} onClick={() => {if(modalBody) closeModal();}}>
            <Modal displayed={modalBody} closeModal={closeModal} >
                { modalBody }
            </Modal>
            <header className={"homeheader"}>
                <div className={"homeheader-inner"}>
                    <img src={logo} alt={"Advocate logo"}/>
                    <div className={"promptcontainer"}>
                        <div
                            onClick={() => {
                                setModalAction("login")}
                            }
                            onKeyPress={event => {divKeyPressEvent(event, "login");}}
                            tabIndex={0}
                            className={"headerlogin selectable navdiv-hover"}>
                            <UserIcon className={"i-right"}/>
                            <span>Login</span>
                        </div>
                        <div
                            onClick={() => {
                                setModalAction("register")
                            }}
                            onKeyPress={event => {divKeyPressEvent(event, "register");}}
                            tabIndex={0}
                            className={"headerregister selectable navdiv-hover"}>
                            <UserPlusIcon className={"i-right"}/>
                            <span>Register</span>
                        </div>
                    </div>
                </div>
            </header>
            <div className={"herocontainer"}>
                <div className={"hero-overlay"}/>
                <div className={"herotext"}>
                    <h1>Advocate IEP</h1>
                    <h2>The modern standard of monitoring student progress.</h2>
                    <p>See how Advocate IEP meets teachers where they're at to help ensure consistent student achievement.</p>
                    <Button className={"margin-auto"} text={"Get Started Now"} icon={<PlaneIcon/>}/>
                </div>
            </div>
            <div className={"summary-wrapper"}>
                <div className={"summary-inner"}>
                    <div className={"summary-section"}>
                        <h2 className={"marg-bot"}>Centralized & Persistent</h2>
                        <p>
                            All your IEPs, data points, and progress reports in one place that follows the student from teacher to teacher.
                            No more shuffling between documents and spreadsheets to format your data how you want it and gone are the days
                            of manually retrieving your entire dataset to email it to the next teacher- in hopes that you didn't miss
                            anything critical. Audits just became less intimidating.
                        </p>
                        <BriefcaseIcon className={"summary-bg-icon"}/>
                    </div>
                    <div className={"summary-section"}>
                        <h2 className={"marg-bot"}>Simple & Fast</h2>
                        <p>
                            Advocate IEP doesn't dictate how you should work and makes recording data painless.
                            You can choose from many different trial templates for various ways of tracking or
                            you can customize and reuse your own. Copy goals and benchmarks from student to student to
                            save even more time and get back to changing lives.

                        </p>
                        <HourglassIcon className={"summary-bg-icon"}/>
                    </div>
                    <div className={"summary-section"}>
                        <h2 className={"marg-bot"}>Visual & Informative</h2>
                        <p>
                            Choose how you want to graph your students' goal, benchmark, and trial summaries to
                            gain insight into risk patterns, help you make data-driven decisions, and ensure consistent
                            progress. When all is said and done, generating a comprehensive progress report for individual
                            students and entire classrooms takes only a couple of clicks.
                        </p>
                        <MapIcon className={"summary-bg-icon"}/>
                    </div>
                </div>
            </div>
            <div className={"benefits-wrapper"}>
                <div className={"benefits-inner"}>
                    <h2>Why is Advocate IEP the new standard?</h2>
                    <p className={"marg-bot-3"}>
                        We're teachers advocating for other teachers. We understand recording data isn't glamorous and can be downright tedious.
                        Advocate IEP is packed full of intuitive features that expedite the process of taking data and covers all your bases.
                        You'll be surprised how little effort it requires and how much time you'll get back.
                        Current and future features include..
                    </p>
                    <div className={"benefits-inner__list"}>
                        <div className={"benefits-inner__list__column"}>
                            <p className={"marg-bot"}><HandIcon className={"i-right"}/>Custom or pre-made trial templates</p>
                            <p className={"marg-bot"}><HandIcon className={"i-right"}/>Transfer students between teachers</p>
                            <p className={"marg-bot"}><HandIcon className={"i-right"}/>Generate progress reports</p>

                        </div>
                        <div className={"benefits-inner__list__column"}>
                            <p className={"marg-bot"}><HandIcon className={"i-right"}/>Customize your dashboard</p>
                            <p className={"marg-bot"}><HandIcon className={"i-right"}/>Identify at-risk students</p>
                            <p className={"marg-bot"}><HandIcon className={"i-right"}/>Attach documents and take notes</p>

                        </div>
                        <div className={"benefits-inner__list__column"}>
                            <p className={"marg-bot"}><HandIcon className={"i-right"}/>Integrate with Google Suite</p>
                            <p className={"marg-bot"}><HandIcon className={"i-right"}/>Fully compliant with audits</p>
                            <p className={"marg-bot"}><HandIcon className={"i-right"}/>Add co-teachers to classrooms</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className={"beta-wrapper"}>
                <div className={"beta-overlay"}/>
                <div className={"beta-inner"}>
                    <h2>Become an Advocate for Advocate IEP</h2>
                    <p className={"marg-bot"}>
                        Advocate IEP is still in beta, which means we need early testers that are eager to give feedback
                        and help make the platform the best it can be. This means you get Advocate IEP free for one year,
                        a 50% discount on your next year, and you get a say in what features we should add, keep, or modify.
                    </p>
                    <Button text={"Let's Change Lives"} icon={<PeaceIcon/>}/>
                </div>
            </div>
            <footer className={"homepage-footer"}>
                <p className={"marg-bot"}>We do not disclose any data of any kind to outside parties. Ever. We encrypt all personally
                    identifying information (PII) of students on secured servers to ensure compliance with FERPA and COPPA regulations.</p>
                <p>&copy; Advocate IEP {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
};
//centralized & persistent, simple & fast,
export default Home;