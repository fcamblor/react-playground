import {fetchPokemons, Pokemon} from "./services/fetchPokemons.ts";
import {PokemonComponent} from "./PokemonComponent.tsx";
import {useState} from "react";

export function PokemonsComponent({
}: {
}) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  const fetchPokemonsClicked = async () => {
    const pokemons = await fetchPokemons()
    setPokemons(pokemons);
  }

  const movePokemon = (pokemonId: number, endingIndex: number) => {
    const startingIndex = pokemons.findIndex(pk => pk.id === pokemonId)
    if(startingIndex !== -1) {
      const swap = pokemons[endingIndex]
      pokemons[endingIndex] = pokemons[startingIndex]
      pokemons[startingIndex] = swap;
      setPokemons([...pokemons]);
    }
  }

  return (
    <>
      <button onClick={fetchPokemonsClicked}>Fetch Pokemons</button>
      {!!pokemons.length && (
        <dl>
          {pokemons.map((pokemon, idx) => (
            <PokemonComponent
              key={pokemon.id}
              pokemon={pokemon}
              onUp={() => movePokemon(pokemon.id, (idx + pokemons.length - 1) % pokemons.length)}
              onDown={() => movePokemon(pokemon.id, (idx + pokemons.length + 1) % pokemons.length)}
            ></PokemonComponent>
          ))}
        </dl>
      )}
    </>
  )

}
