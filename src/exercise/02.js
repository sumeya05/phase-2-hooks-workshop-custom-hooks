import { useState, useEffect } from "react";

export function usePokemon(name) {
  const [state, setState] = useState({
    data: null,
    status: "idle",
    errors: null,
  });

  useEffect(() => {
    if (!name) return;

    setState({ data: null, status: "pending", errors: null });

    fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then(res => {
        if (!res.ok) throw new Error("Pokemon not found");
        return res.json();
      })
      .then(data => {
        setState({ data, status: "success", errors: null });
      })
      .catch(err => {
        setState({ data: null, status: "error", errors: err });
      });
  }, [name]);

  return state;
}
