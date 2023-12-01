import React from "react";

import { capitalizeWord, removeHyphen } from "@/app/lib/helpers";

import { useSelector } from "react-redux";


function Abilities(){
  const pokeState = useSelector(state => state.pokemon);

  return(
    <>
      <h4 className="text-lg">Abilities</h4>
      <div id='pokemon-abilities' className="flex justify-around bg-transparent/50">
        {
          pokeState.pokemon?.abilities.map(ability => <p>{capitalizeWord(removeHyphen(ability.name))}</p>)
        }
      </div>
    </>
  )
}

export default Abilities;