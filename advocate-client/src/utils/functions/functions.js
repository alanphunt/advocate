import React from "react";
import {BAD_REQUEST_STATUS, FORBIDDEN_STATUS, JSON_HEADER, SERVER_ERROR} from "utils/constants";
import {FaRegEdit as EditIcon, FaRegTrashAlt as TrashIcon} from "react-icons/fa";
import {convertToRaw} from 'draft-js';
import {Document} from "utils/classes/ContextModels"

export const fetchPost = (path, body, callback, errorCallback, catchCallback) => {
    const formData = new FormData();
    formData.append("body", JSON.stringify(body));

    fetch(`/api/${path}`,
        {
            method: "POST",
            body: formData
        })
        .then(resp => Promise.all([resp.ok ? resp.json() : resp.text(), resp.ok, resp.status, resp.headers]))
        .then(([data, ok, status, headers]) => {
            if(ok)
                callback(data, headers, status);
            else
                errorCallback(data, headers, status);
        })
        .catch(e => {
            if(catchCallback)
                catchCallback(e);
            else
                alert(SERVER_ERROR);
        });
};

export const multipartFetch = (path, body, callback, errorCallback, catchCallback) => {
    fetch(`/api/${path}`, {method: "POST", body: formifyObject(body)})
    .then(resp => Promise.all([resp.ok ? resp.json() : resp.text(), resp.ok, resp.status, resp.headers]))
    .then(([data, ok, status, headers]) => {
        if(ok)
            callback(data, headers, status);
        else
            errorCallback(data, headers, status);
    })
    .catch(e => {
        if(catchCallback)
            catchCallback(e);
        else
            alert(SERVER_ERROR);
    });
};

export const calculateGoalCompletion = (goals) => {
    const goalCount = goals.length || 0;
    const completedGoals = goals.filter(goal => (goal.benchmarks?.filter(bm => bm.complete === 1).length || -1) === goal.benchmarks.length).length;
    let percent = Math.round((completedGoals / goalCount) * 100);
    return isNaN(percent) ? 0 : percent;
};

export const mapStudentGoalMeta = (student, goals) => {
    return {id: student.id, name: student.name, goalCount: goals.length || "0", completion: `${calculateGoalCompletion(goals)}%`};
};

export const crudFetch = ({path, method, body, success, error, serverError, headers}) => {
    let opts = {method: method};
    if(method !== "DELETE" && method !== "GET"){
        opts.body = body;
        if(headers)
            opts.headers = headers;
    }
    fetch(`/api/${path}`, {...opts})
        .then(res => Promise.all([res.ok, res.json(), res.status]))
        .then(([ok, body, status]) => {
            if(ok)
                success(body);
            else if(status === BAD_REQUEST_STATUS)
                error(body);
            else
                serverError();
        });
};

export const fileFetch = (apiPath, {path, name, type}, action, handleError, handleServerError, callback) => {
    fetch(apiPath, {body: JSON.stringify({path, name, type}), method: "POST", headers: JSON_HEADER})
    .then(res =>  Promise.all([res.ok, res.ok ? res.blob() : res.json(), res.status]))
    .then(([ok, body, status]) => {     
        if(ok){
            generateFilePreview(body, type, name, action);
        }
        else if (status !== FORBIDDEN_STATUS)
            handleError(body);
        else
            handleServerError();
        callback && callback();
    });
};

//Pass in an object and it'll split camelCaseKeys into ["Camel Case Keys"]
export const splitAndCapitalizeObjectKeys = (object) => {
    let newArray = [];
    Object.keys(object).forEach(key => {
        let splitKeys = [...key.matchAll(/[a-z]+|[0-9]+|(?:[A-Z][a-z]+)|(?:[A-Z]+(?=(?:[A-Z][a-z])|[^AZa-z]|[$\d\n]))/g)].join(" ");
        splitKeys = splitKeys.charAt(0).toUpperCase() + splitKeys.substring(1);    
        newArray.push(splitKeys);
    });
    return newArray;
};

export const editDeleteIcons = (specificObject) => {
    let tag = `${specificObject ? specificObject : ""}`
    let editKey = `edit${tag}`;
    let deleteKey = `delete${tag}`;
    return {[editKey]: <EditIcon className={"i-right hover-color selectable"}/>, [deleteKey]: <TrashIcon className={"hover-color selectable"}/>};
};

export const determineTrialAverage = (trials, trackings) => {
    let releventTrackings = [];
    trials.forEach(trial => trial.trackingIds.forEach(id => releventTrackings.push(trackings[id])));
    let correctTracks = releventTrackings.filter(track => track.correct).length;
    if(releventTrackings){
        let total =  correctTracks / releventTrackings.length * 100;
        return total ? total.toFixed(1) : 0;
    }
    return 0;
};

export const studentViewObject = (student) => {
    return {
        name: student.name,
        age: student.age,
        grade: student.grade
    };
};

export const base64ToArrayBuffer = (base64) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
};

export const convertFileSize = (fileSize) => {
    let size = "";
    if(fileSize < 1024){
        size = (fileSize === 0 ? "N/A" : fileSize + " B");
    }else if(fileSize >= 1024 && fileSize < 1048576){
        size = (fileSize/1024).toFixed(1) + " KB";
    }else if(fileSize >= 1048576 && fileSize < 1073741824){
        size = (fileSize/1048576).toFixed(1) + " MB";
    }else if(fileSize >= 1073741824) {
        size = (fileSize / 1073741824).toFixed(1) + " GB";
    }
    return size;
};

export const generateFilePreview = (body, type, name, action) => {
    const link = document.createElement('a');
        //if 'type' exists that means the blob is coming from the server
        link.href = type ? URL.createObjectURL(body, {type: type}) : URL.createObjectURL(body);
        link.setAttribute("target", "_blank");
        if(action === "download")
            link.setAttribute('download', name);
        link.setAttribute("type", 'hidden');
        document.body.appendChild(link);
        link.dispatchEvent(new MouseEvent(`click`));
        document.body.removeChild(link);
        // URL.revokeObjectURL(link.href); 
};

export const formifyObject = (object) => {
    let fd = new FormData();
    Object.keys(object).forEach(key => {
        let val = object[key];
            fd.append(key, val);
    })
    return fd;
};

//returns array of updated document metadata according to an array of new Files
export const mapFileMetaDataToDocument = (fileArray, docArray, trialId) => {
    let fileMeta = [...docArray]
    fileArray?.forEach(file => {
        // fileMeta.push({trialId: trialId || "", name: file.name, type: file.type, size: file.size, lastModified: file.lastModified})
        fileMeta.push({...new Document(), name: file.name, type: file.type, size: file.size, lastModified: file.lastModified})
    })
    return fileMeta
};

//takes in a contentstate and converts to json if there is text or simply returns a blank string
export const prepareEditorStateForRequest = (text) => {
    try{ 
        return JSON.stringify(convertToRaw(text))
    }catch(e){
        return text
    }
};

//takes in an array of student objects (a classroom) to which it'll extract only name, age, and grade properties of the student
export const formatStudentObject = (studentArray) => {
    return studentArray.map(student => {
        const {id, name, age, grade} = student;
        return {id, name, age, grade}
    });
};

export const determineScoreTrialAccuracy = (trackings) => {
    const correct = trackings.filter(t => t.correct === 1);
    const a = ((correct?.length / trackings?.length * 100)).toFixed(1);
    let obj = {};
    obj.accuracy = a || 0;
    obj.inaccuracy = 100-a;
    obj.correct = correct?.length || 0;
    obj.incorrect = trackings?.length - correct?.length || 0;
    obj.total = trackings?.length || 0;
    obj.correctLabels = correct.map(trial => trial.label).join(", ");
    obj.incorrectLabels = trackings.filter(track => track.correct !== 1).map(trial => trial.label).join(", ");
    return obj;
};

export const arrayToObject = (array) => {
    let newObject = {};
    array.forEach((obj, ind) => Object.assign(newObject, {[obj.id]: {...obj[ind]}}));
    return newObject;
};

export const blobifyJson = (json) => {
    return new Blob([JSON.stringify(json)], {
        type: "application/json"
    });
};