import { useState, useEffect } from "react";

export const getLocalStorage = (key, defaultValue) => {
    const data = localStorage.getItem(key);
    const initial = JSON.parse(data);
    return initial || defaultValue;
};

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getLocalStorage(key, defaultValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

