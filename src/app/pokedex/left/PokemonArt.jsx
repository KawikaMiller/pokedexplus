import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import sprites from "../../../../public/sprites";
import PokemonFormsAndCry from "./PokemonFormsAndCry";

function PokemonArt(props) {
  
  const pokeState = useSelector(state => state.pokemon);
  const dexState = useSelector(state => state.pokedex);

  const [spriteIdx, setSpriteIdx] = useState(0);
  const [spriteType, setSpriteType] = useState('world')
  const [isShiny, setIsShiny] = useState(false)
  const [imgSrc, setImgSrc] = useState('https://placehold.co/475x475/22d3ee/22d3ee?text=\n')

  const handleIsShiny = () => {
    setIsShiny(!isShiny)
  }

  const changeImgSrc = (type) => {
    // if spriteType in state is different to type argument, we need to change the spriteType in state
    // we also need to reset the spriteIdx back to 0 in case there are multiple sprites in any given spriteType
    if(spriteType !== type){
      setSpriteType(type)
      setSpriteIdx(0)
    } 
    // otherwise, we know the spriteType is the same so we only need to change our spriteIdx
    else {
      // if incrementing our spriteIdx surpasses the length of the sprite array, then we reset back to 0
      if(spriteIdx + 1 >= pokeState.pokemon.forms[spriteType].length){
        setSpriteIdx(0)
      }
      // otherwise, increment spriteIdx by 1
      else {
        setSpriteIdx(spriteIdx + 1)
      }
    }
  }

  useEffect(() => {
    // if the property 'apiId' exists in the current sprite object, then we can use a string template and insert the apiId into the imgSrc
    if(pokeState.pokemon?.forms[spriteType][spriteIdx].apiId){
      isShiny ?
      setImgSrc(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokeState.pokemon.forms[spriteType][spriteIdx].apiId}.png`)
      : 
      setImgSrc(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeState.pokemon.forms[spriteType][spriteIdx].apiId}.png`)
    } 
    // otherwise, we get the url directly from the sprite object
    // this case is most likely because the sprite/artwork is missing from pokeAPI and needed to be fetched from a third party source
    else {
      setImgSrc(pokeState.pokemon?.forms[spriteType][spriteIdx].url)
    }

  }, [isShiny, spriteIdx, spriteType])

  useEffect(() => {
    setSpriteIdx(0)
    setImgSrc(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeState.pokemon?.forms.world[0].apiId}.png` || undefined)
  },
    // eslint-disable-next-line
    [pokeState.pokemon])
    

  return (

    <div id='pokemon-image-container' className="border-[12px] rounded-md border-white border-solid min-h-0 min-w-0 object-fit bg-cyan-400 flex justify-center items-center relative lg:h-4/5">
      
      <Image id='pokemon-image' src={imgSrc} style={{visibility: !dexState.isLoading ? 'visible' : 'hidden' }} alt={`official artwork of ${pokeState.pokemon?.name || null}`} className={`max-w-auto max-h-full`} height={450} width={450}/>
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
          changeImgSrc={changeImgSrc}
          handleIsShiny={handleIsShiny}
        />
      </div>
    </div>

  )

}

export default PokemonArt;