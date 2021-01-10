import {useState, useContext, createContext, useMemo} from "react";
import {JWT_ERROR, SERVER_ERROR, STORAGE, JSON_HEADER} from "utils/constants";
import { useHistory, useLocation } from 'react-router';

export const TeacherContext = createContext();

export const useProvideAuth = () => {
    const [teacher, setTeacher] = useState(null);
    const memoizedTeacher = useMemo(() => ({teacher}), [teacher]);
    const history = useHistory();
    const location = useLocation();

    const _completeFetch = (body, path, callback) => {
        setTeacher(body);
        history.replace(path);
        callback && callback();
    };

    const signin = (data, errorHandler, callback) => {
        fetch(`/api/authenticate`, {method: "POST", body: JSON.stringify(data), headers: JSON_HEADER})
        .then(response => Promise.all([response.ok, response.json()]))
        .then(([ok, body]) => {
            if(ok)
                _completeFetch(body, "/dashboard/main");
            else
                errorHandler(body);
            callback && callback();
        })
        .catch(() => alert(SERVER_ERROR));
    };

    const register = (data, errorHandler, callback) => {
        fetch(`/api/createuser`, {method: "POST", body: JSON.stringify(data), headers: JSON_HEADER})
        .then(response => Promise.all([response.ok, response.json()]))
        .then(([ok, body]) => {
            if(ok)
                _completeFetch(body, "/dashboard/main");
            else
                errorHandler(body);
            callback && callback();
        })
        .catch(() => alert(SERVER_ERROR));
    };

    const refreshTeacher = async (callback) => {
        let resp = await fetch("/api/teacher");
        if (!resp.ok)
            throw new Error(JWT_ERROR);
        else
            await resp.json().then(body => {
                _completeFetch(body, location.pathname, callback);
            });
    };

    const signout = () => {
        fetch("/api/logout");
        STORAGE.clear();
        history.replace("/", {from: "/"});
        setTeacher(null);
    };

    return {
        ...memoizedTeacher,
        setTeacher,
        signin,
        signout,
        refreshTeacher,
        register
    };
    
};

export const useAuth = () => {
    return useContext(TeacherContext);
};