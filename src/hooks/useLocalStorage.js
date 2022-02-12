import { useEffect, useState } from 'react';

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue) return JSON.parse(jsonValue);
    console.log(JSON.parse(jsonValue));

    if (typeof defaultValue == 'function') {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  //  update localStorage
  // componentDidUpdate() {} -- for specified states
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
