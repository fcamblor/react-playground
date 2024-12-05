import {fetchPokemons, Pokemon} from "./services/fetchPokemons.ts";
import {PokemonComponent} from "./PokemonComponent.tsx";
import {useCallback, useState} from "react";

export function PokemonsComponent({
}: {
}) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  const fetchPokemonsClicked = async () => {
    const pokemons = await fetchPokemons()
    setPokemons(pokemons);
  }

  const swapPokemons = useCallback((index1: number, index2: number) => {
    setPokemons((previousPokemons) => {
      const updatedPokemons = [...previousPokemons];
      [updatedPokemons[index1], updatedPokemons[index2]] = [updatedPokemons[index2], updatedPokemons[index1]];
      return updatedPokemons;
    })
  }, []);

  return (
    <>
      <button onClick={fetchPokemonsClicked}>Fetch Pokemons</button>
      {!!pokemons.length && (
        <dl>
          {pokemons.map((pokemon, idx) => (
            <PokemonComponent
              key={pokemon.id}
              currentIndex={idx}
              pokemonsSize={pokemons.length}
              pokemon={pokemon}
              onSwap={swapPokemons}
            ></PokemonComponent>
          ))}
        </dl>
      )}
    </>
  )

}
