import * as React from "react";

function useLocalStorage(key, initialValue = null) {
  const [value, setValue] = React.useState(() => {
    try {
      const jsonValue = window.localStorage.getItem(key);
      if (jsonValue != null) return JSON.parse(jsonValue);
      return initialValue; // ✅ ensures null instead of undefined
    } catch {
      return initialValue;
    }
  });

  React.useEffect(() => {
    try {
      // ✅ prevent unnecessary double writes
      window.localStorage.setItem(key, value);
    } catch {}
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
