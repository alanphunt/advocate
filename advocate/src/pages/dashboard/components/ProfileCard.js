import React, {useState} from "react";
import imgph from "../../../assets/imgph-sm.png";
import {FaPlus as PlusIcon} from "react-icons/fa";

const ProfileCard = (props) => {

    const [picHovered, setPicHovered] = useState(false);

    let teacher = props.teacher;

    return (
        <div className={"posabs profilecard"}>
            <div className={"profilecarddheader"}>
                <div className={"cropped"} onMouseEnter={() => {setPicHovered(true)}} onMouseLeave={() => {setPicHovered(false)}}>
                    <img src={imgph} alt={"user"}/>
                    { props.editable &&
                               <label htmlFor={"file"} className={"addpic" + (picHovered ? " display" : "")}>
                                    <PlusIcon/>
                                    <input id="file" type="file" name="file" accept="image/*" style={{display: 'none'}}/>
                                </label>
                    }
                </div>
                <h2>{teacher.firstName.charAt(0).toUpperCase()+teacher.firstName.substring(1) + " " + teacher.lastName.charAt(0).toUpperCase()+teacher.lastName.substring(1)}</h2>
            </div>
            <div className={"piccardinfo"}>
                <p className={"quote"}>{teacher.description === "" ? "Tell us about yourself!" : teacher.description}</p>
                <p>Member since {new Date(teacher.dateCreated).toDateString()}</p>
            </div>
        </div>
    )
};

export default ProfileCard;