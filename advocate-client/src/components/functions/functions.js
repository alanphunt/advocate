import {ERROR_STATUS, SERVER_ERROR} from "utils/constants";

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

export const crudFetch = (path, formData, success, error, logout) => {
    fetch(`/api/${path}`, {body: formData, method: "POST"})
        .then(res => Promise.all([res.ok, res.ok ? res.json() : res.text(), res.status]))
        .then(([ok, body, status]) => {
            if(ok){
                success(body);
            }else if(status !== ERROR_STATUS){
                error(body);
            }else{
                logout();
            }
        });
};