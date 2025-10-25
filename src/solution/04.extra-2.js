import * as React from "react";

function useLocalStorage(key, initialValue = null) {
  const [value, setValue] = React.useState(() => {
    try {
      const jsonValue = window.localStorage.getItem(key);
      if (jsonValue != null) return JSON.parse(jsonValue);
      return initialValue;
    } catch {
      return initialValue;
    }
  });

  // ✅ store updated value
  React.useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  // ✅ sync across tabs
  React.useEffect(() => {
    const handleStorage = event => {
      if (event.key === key) {
        const newValue = event.newValue ? JSON.parse(event.newValue) : null;
        setValue(newValue); // ✅ update state
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);

  return [value, setValue];
}

export default useLocalStorage;
