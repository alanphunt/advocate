import React, {useState} from "react";
import imgph from "images/imgph-sm.png";
import {FaPlus as PlusIcon} from "react-icons/fa";
import H2 from "./H2";

const ProfileCard = ({teacher, editable}) => {

    const [picHovered, setPicHovered] = useState(false);

    return (
        <div className={"profilecard"}>
            <div className={"profilecarddheader"}>
                <div className={"cropped"} onMouseEnter={() => {setPicHovered(true)}} onMouseLeave={() => {setPicHovered(false)}}>
                    <img src={imgph} alt={"user"}/>
                    { editable &&
                               <label htmlFor={"file"} className={"addpic" + (picHovered ? " display" : "")}>
                                    <PlusIcon/>
                                    <input id="file" type="file" name="file" accept="image/*" style={{display: 'none'}}/>
                                </label>
                    }
                </div>
                <H2>{teacher.firstName.charAt(0).toUpperCase()+teacher.firstName.substring(1) + " " + teacher.lastName.charAt(0).toUpperCase()+teacher.lastName.substring(1)}</H2>
            </div>
            <div className={"piccardinfo"}>
                <p className={"quote"}>{teacher.description === "" ? "Tell us about yourself!" : teacher.description}</p>
                <p>Member since {teacher.dateCreated}</p>
            </div>
        </div>
    )
};

export default ProfileCard;