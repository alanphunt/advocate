import React from "react";
import {SERVER_ERROR, BAD_REQUEST_STATUS, FORBIDDEN_STATUS} from "utils/constants";
import {FaRegTrashAlt as TrashIcon, FaRegEdit as EditIcon} from "react-icons/fa";

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

export const calculateGoalCompletion = (student) => {
    const goals = student.goals;
    const goalCount = goals.length || 0;
    const completedGoals = goals.filter(goal => goal.benchmarks.filter(bm => bm.complete === 1).length === goal.benchmarks.length).length;
    let percent = Math.round((completedGoals / goalCount) * 100);
    return isNaN(percent) ? 0 : percent;
};

export const studentGoalMeta = (students) => {
    return students.map(student => {
        return {name: student.name, goalFocus: student.goalFocus, goalCount: student.goals.length, completion: `${calculateGoalCompletion(student)}%`};
    });
};

export const isGoalComplete = (goal) => {
    return checkIncompleteBenchmarks(goal) === 0;
};

export const checkIncompleteBenchmarks = (goal) => {
    return goal.benchmarks.filter(bm => bm.complete === 0).length;
};

export const checkLocalForCreated = (key) => {
    if (localStorage.getItem(key))
        localStorage.removeItem(key);
};

export const crudFetch = (path, method, formData, success, error, logout, headers) => {
    fetch(`/api/${path}`, {body: formData, method: method, headers: headers || null})
        .then(res => Promise.all([res.ok, res.ok ? res.json() : res.text(), res.status]))
        .then(([ok, body, status]) => {
            if(ok)
                success(body);
            else if(status !== FORBIDDEN_STATUS)
                error(body);
            else
                logout();
        });
};

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
