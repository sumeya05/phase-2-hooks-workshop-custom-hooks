import { useState, useEffect } from "react";

function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState({
    data: null,
    status: "idle",
    errors: null,
  });

  useEffect(() => {
    let mounted = true;

    setState({ data: null, status: "pending", errors: null });

    asyncFn()
      .then(data => {
        if (mounted) setState({ data, status: "fulfilled", errors: null });
      })
      .catch(() => {
        if (mounted)
          setState({ data: null, status: "rejected", errors: ["Not found"] });
      });

    return () => {
      mounted = false;
    };
  }, deps);

  return state;
}

export default useAsync;
