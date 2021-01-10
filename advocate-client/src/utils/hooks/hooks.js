import {useEffect, useState} from "react";
import {STORAGE} from "utils/constants";

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

export const useLocalStorage = (key, init = null) => {
    let val = STORAGE.getItem(key);
    val = typeof +val === "number" ? +val : val;
    const [ls, setLs] =  useState(val || init);
    return [ls, (val) => {
        STORAGE.setItem(key, val);
        setLs(val);
    }];
};

