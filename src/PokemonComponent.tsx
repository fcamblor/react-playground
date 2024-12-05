import {Pokemon} from "./services/fetchPokemons.ts";


export function PokemonComponent({ pokemon, onUp, onDown }: { pokemon: Pokemon, onUp: () => void, onDown: () => void }) {
  console.log(`Rendering porkemon #${pokemon.id}`)
  return <>
    <dt>#{pokemon.id} {pokemon.name}
      <button onClick={onUp}>⬆️</button>
      <button onClick={onDown}>⬇️</button>
    </dt>
    <dd><img src={pokemon.sprites.front_default || pokemon.sprites.back_default}/></dd>
  </>
}

//export const PokemonComponent = memo(_Pokemon)
