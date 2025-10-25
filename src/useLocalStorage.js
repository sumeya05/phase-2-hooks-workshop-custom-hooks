import { useState, useEffect, useCallback } from "react";

function useLocalStorage(key, initialValue = null) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = useCallback(
    newValue => {
      try {
        const valueToStore =
          typeof newValue === "function" ? newValue(value) : newValue;
        setValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch {}
    },
    [key, value]
  );

  useEffect(() => {
    const handleStorage = event => {
      if (event.key === key) {
        setValue(event.newValue !== null ? JSON.parse(event.newValue) : null);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);

  return [value, setStoredValue];
}

export default useLocalStorage;
