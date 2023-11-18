import React from "react";
import TypeBadge from "../accessory/TypeBadge";

import { useDispatch, useSelector } from "react-redux";
import pokeSlice from "@/app/reduxStore/pokeSlice";

function BasicInfo(props) {

  const pokeState = useSelector(state => state.pokemon)

  return(
    <div id='pokemon-basic-info' className="flex flex-col justify-between h-fit">

      <div>
        <div id='basic-info-top' className="flex justify-between items-center h-1/2">
          <h1 id='pokemon-name' className="font-bold text-3xl">{pokeState?.pokemon?.name ? pokeState.pokemon.name : 'missingName'}</h1> 
          <h1 id='pokemon-number' className="font-medium lg:font-semibold text-xl">#0001</h1>
        </div>

        <div id='basic-info-bot' className="flex justify-between items-center">
          <h1 id='pokemon-category' className="">The Seed Pokemon</h1> 
          <div id='pokemon-types' className="flex justify-end w-1/3">
            <div id='type1' className="w-fit pr-1 text-center">
              <TypeBadge type='Grass'/>
            </div>
            <div id='type2' className="w-fit pl-1 text-center">
              <TypeBadge type='Poison'/>
            </div>
          </div>
        </div>        
      </div>

    </div>
  )

}

export default BasicInfo;