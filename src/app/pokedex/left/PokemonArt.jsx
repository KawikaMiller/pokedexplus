import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import sprites from "@/app/lib/sprites";

function PokemonArt(props) {

  const pokeState = useSelector(state => state.pokemon);
  const dexState = useSelector(state => state.pokedex);

  const [missingSprites, setMissingSprites] = useState(null);

  const getMissingSprites = () => {
    if (pokeState.pokemon?.name) {
      if (sprites[pokeState.pokemon.name]) {
        setMissingSprites(sprites[pokeState.pokemon.name])
      } else {
        setMissingSprites(null)
      }
    }
  }

  useEffect(() => {
    getMissingSprites();
  },
    // eslint-disable-next-line
    [])

  let src;

  pokeState.pokemon ?
    missingSprites ?
      pokeState.formIdx === 0 ?
        pokeState.showShiny ?
          src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokeState.pokemon.forms[pokeState.formIdx].apiId}.png`
          :
          src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeState.pokemon.forms[pokeState.formIdx].apiId}.png`
        :
        pokeState.showShiny ?
          src = missingSprites[pokeState.formIdx - 1]
          :
          src = missingSprites[pokeState.formIdx - 1]
      :
      pokeState.showShiny ?
        src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokeState.pokemon.forms[pokeState.formIdx].apiId}.png`
        :
        src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeState.pokemon.forms[pokeState.formIdx].apiId}.png`
    :
    src = null

  return (

    <div className="border-[12px] rounded-md border-white border-solid min-h-0 min-w-0 object-fit bg-cyan-400 flex justify-center items-center">
      <img id='pokemon-image' src={src} style={{visibility: !dexState.isLoading ? 'visible' : 'hidden' }} alt='alt-text-go-here' className={`max-w-auto max-h-full`} />
      {!dexState.isLoading ?
        <>
          <Spinner animation="grow" role="status" variant="light" className="z-10 relative right-1/2">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          {/* <Spinner animation="grow" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <Spinner animation="grow" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner> */}
        </>
        :
        null
      }
    </div>

  )

}

export default PokemonArt;