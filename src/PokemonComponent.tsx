import {Pokemon} from "./services/fetchPokemons.ts";
import {memo} from "react";


export const PokemonComponent = memo(
  ({
     currentIndex,
     pokemonsSize,
     pokemon,
     onSwap
  }: {
    currentIndex: number,
    pokemonsSize: number,
    pokemon: Pokemon,
    onSwap: (index1: number, index2: number) => void
  }) => {
    const onUp = () => {
      onSwap(currentIndex, (currentIndex + pokemonsSize - 1) % pokemonsSize)
    };
    const onDown = () => {
      onSwap(currentIndex, (currentIndex + pokemonsSize + 1) % pokemonsSize)
    };

    console.log(`Rendering porkemon #${pokemon.id}`)
    return <>
      <dt>#{pokemon.id} {pokemon.name}
        <button onClick={onUp}>⬆️</button>
        <button onClick={onDown}>⬇️</button>
      </dt>
      <dd><img src={pokemon.sprites.front_default || pokemon.sprites.back_default}/></dd>
    </>
  }
);
