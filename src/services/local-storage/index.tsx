import { useState, useEffect } from 'react';

export const getLocalStorage = (key:string, defaultValue:any) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

export const useLocalStorage = (key:string, defaultValue:any) => {
  const [value, setValue] = useState(() => getLocalStorage(key, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
