import {useEffect, useState} from "react";
import {STORAGE} from "utils/constants";
import {createContext} from "react";

export const useToaster = (initialValue) => {
    const [displayed, setDisplayed] = useState(initialValue);
    useEffect(() => {
        if(displayed)
            setTimeout(() => {setDisplayed(false)}, 3500);
        return () => {
            setDisplayed(false);
        }
    });
    return [displayed, setDisplayed];
};

export  const useToggle = (initial) => {
    const [open, setOpen] = useState(initial);
    return [open, () => {
        setOpen(status => !status);
    }];
};

export const useLocalStorage = (init, key) => {
    const val = STORAGE.getItem(key);
    const [state, setState] = useState(val || init);
    return [state, setState];
};

export const TeacherContext = createContext(null);
