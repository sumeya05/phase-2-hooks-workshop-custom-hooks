import * as React from "react";

function useAsync(asyncCallback, dependencies = []) {
  const [state, setState] = React.useState({
    data: null,
    status: "idle",
    errors: null,
  });

  React.useEffect(() => {
    let isMounted = true;

    setState({ data: null, status: "pending", errors: null });

    asyncCallback()
      .then(data => {
        if (isMounted) setState({ data, status: "fulfilled", errors: null }); // ✅ fixed: 'fulfilled'
      })
      .catch(() => {
        if (isMounted)
          setState({
            data: null,
            status: "rejected", // ✅ fixed: 'rejected'
            errors: ["Not found"], // ✅ fixed: array of strings
          });
      });

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return state;
}

function usePokemon(pokemonName) {
  const fetchPokemon = React.useCallback(async () => {
    if (!pokemonName) return null;

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );

    if (!response.ok) {
      throw new Error("Not found");
    }

    return response.json();
  }, [pokemonName]);

  return useAsync(fetchPokemon, [fetchPokemon]);
}

export { useAsync, usePokemon };
