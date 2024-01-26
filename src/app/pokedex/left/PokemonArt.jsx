import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import sprites from "@/app/lib/sprites";
import PokemonFormsAndCry from "./PokemonFormsAndCry";

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
    src = 'https://placehold.co/475x475/22d3ee/22d3ee?text=\n'

  return (

    <div id='pokemon-image-container' className="border-[12px] rounded-md border-white border-solid min-h-0 min-w-0 object-fit bg-cyan-400 flex justify-center items-center relative lg:h-full">
      
      <img id='pokemon-image' src={src} style={{visibility: !dexState.isLoading ? 'visible' : 'hidden' }} alt='alt-text-go-here' className={`max-w-auto max-h-full`} />
      {/* {dexState.isLoading ?
        <div className="z-10 absolute flex w-full justify-evenly">
          <div className="bg-white w-10 h-10 rounded-[50%] animate-ping"/>
          <div className="bg-white w-10 h-10 rounded-[50%] animate-ping"/>
          <div className="bg-white w-10 h-10 rounded-[50%] animate-ping"/>
        </div>
        :
        null
      } */}
      <div className="absolute top-1 left-1">
        <PokemonFormsAndCry />
      </div>
    </div>

  )

}

export default PokemonArt;