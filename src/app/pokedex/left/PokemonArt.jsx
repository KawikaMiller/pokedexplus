import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import sprites from "../../../../public/sprites";
import PokemonFormsAndCry from "./PokemonFormsAndCry";

function PokemonArt(props) {

  const pokeState = useSelector(state => state.pokemon);
  const dexState = useSelector(state => state.pokedex);

  const [missingSprites, setMissingSprites] = useState(null);
  const [spriteIdx, setSpriteIdx] = useState(0);

  // const getMissingSprites = () => {
  //   if (pokeState.pokemon?.name) {
  //     if (sprites[pokeState.pokemon.name]) {
  //       setMissingSprites(sprites[pokeState.pokemon.name])
  //     } else {
  //       setMissingSprites(null)
  //     }
  //   }
  // }

  const changeSpriteIdx = () => {
    // if new sprite idx is greater than the length of our missing sprites array, reset back to 0
    if (spriteIdx + 1 > missingSprites.length){
      setSpriteIdx(0)
    } 
    // otherwise, increment by 1
    else {
      setSpriteIdx(spriteIdx + 1)
    }
  }

  useEffect(() => {
    // getMissingSprites();
    setSpriteIdx(0)
  },
    // eslint-disable-next-line
    [pokeState.pokemon])

  let src;

  // does our redux state have a pokemon object?
  pokeState.pokemon ?
    // did we need to get extra sprites that the pokeAPI did not have?
    missingSprites ?
      // set our img src using our missingSprites
      spriteIdx === 0 ?

        src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeState.pokemon.id}.png`
        :
        src = missingSprites[spriteIdx - 1]

      :
      
      src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeState.pokemon.id}.png`

      :
    //   pokeState.formIdx === 0 ?

    //     pokeState.showShiny ?
    //       src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokeState.pokemon.forms[pokeState.formIdx].apiId}.png`
    //       :
    //       src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeState.pokemon.forms[pokeState.formIdx].apiId}.png`
    //     :
    //     pokeState.showShiny ?
    //       src = missingSprites[pokeState.formIdx - 1]
    //       :
    //       src = missingSprites[pokeState.formIdx - 1]
    //   :
    //   pokeState.showShiny ?
    //     src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokeState.pokemon.forms[pokeState.formIdx].apiId}.png`
    //     :
    //     src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeState.pokemon.forms[pokeState.formIdx].apiId}.png`
    // :
    src = 'https://placehold.co/475x475/22d3ee/22d3ee?text=\n'
    

  return (

    <div id='pokemon-image-container' className="border-[12px] rounded-md border-white border-solid min-h-0 min-w-0 object-fit bg-cyan-400 flex justify-center items-center relative lg:h-4/5">
      
      <Image id='pokemon-image' src={src} style={{visibility: !dexState.isLoading ? 'visible' : 'hidden' }} alt={`official artwork of ${pokeState.pokemon?.name || null}`} className={`max-w-auto max-h-full`} height={450} width={450}/>
      {/* {dexState.isLoading ?
        <div className="z-10 absolute flex w-full justify-evenly">
          <div className="bg-white w-10 h-10 rounded-[50%] animate-ping"/>
          <div className="bg-white w-10 h-10 rounded-[50%] animate-ping"/>
          <div className="bg-white w-10 h-10 rounded-[50%] animate-ping"/>
        </div>
        :
        null
      } */}
      <div className="absolute bottom-0 left-0 w-full">
        <PokemonFormsAndCry 
          missingSprites={missingSprites}
          changeSpriteIdx={changeSpriteIdx}
        />
      </div>
    </div>

  )

}

export default PokemonArt;