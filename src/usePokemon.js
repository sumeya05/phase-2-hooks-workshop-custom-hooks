import { useCallback } from "react";
import useAsync from "./useAsync";

function usePokemon(pokemonName) {
  const fetchPokemon = useCallback(async () => {
    if (!pokemonName) return null;

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );
    if (!res.ok) throw new Error("Not found");

    return res.json();
  }, [pokemonName]);

  return useAsync(fetchPokemon, [fetchPokemon]);
}

export default usePokemon;
