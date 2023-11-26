import React from "react";
import TypeBadge from "../accessory/TypeBadge";

import { capitalizeWord } from "@/app/lib/helpers";

import { useDispatch, useSelector } from "react-redux";
import pokeSlice from "@/app/reduxStore/pokeSlice";

function BasicInfo(props) {

  const pokeState = useSelector(state => state.pokemon)

  return (
    <div id='pokemon-basic-info' className="flex flex-col justify-between h-fit">

      <div>
        <div id='basic-info-top' className="flex justify-between items-center h-1/2 mt-4 lg:mt-0">
          <h1 id='pokemon-name' className="font-bold text-4xl">{pokeState?.pokemon?.name ? capitalizeWord(pokeState.pokemon.name) : 'missingName'}</h1>



          <div id='pokemon-types' className="flex justify-end w-1/5">

            {pokeState?.pokemon?.types.map((element) => {
              return (
                <div id={`type${element.slot}`} className="w-10 h-10 ml-2 flex justify-center items-center">
                  <TypeBadge type={element.type.name} />
                </div>
              )
            })}

          </div>

        </div>

        <div id='basic-info-bot' className="flex justify-between items-center pb-2 sm:pb-4">
          <h1 id='pokemon-category' className="">
            {pokeState?.pokemon?.name ?
              `The ${pokeState.pokemon.genus}`
              :
              `--`
            }
          </h1>

          <h1 id='pokemon-number' className="font-medium lg:font-semibold text-xl">{pokeState?.pokemon?.id ? `#${pokeState.pokemon?.id.toString().padStart(4, '0')}` : '#----'}</h1>
        </div>

      </div>

    </div>
  )

}

export default BasicInfo;