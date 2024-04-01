import React from "react";
import TypeBadge from "../accessory/TypeBadge";
import Abilities from "./Abilities";

import { capitalizeWord, removeHyphen } from "@/app/lib/helpers";

import { useDispatch, useSelector } from "react-redux";
import pokeSlice from "@/app/reduxStore/pokeSlice";

function BasicInfo(props) {

  const pokeState = useSelector(state => state.pokemon)

  return (
    <div id='pokemon-basic-info' className="flex flex-col justify-end h-fit">
        {/* POKEMON NAME AND NUMBER */}
        <div id='basic-info-top' className="flex justify-between items-center lg:mt-0">
          <h1 id='pokemon-name' className="font-bold text-4xl">
            {capitalizeWord(pokeState?.pokemon?.name.split('-')[0] || '') || 'missingName'}
            <span className="text-sm">
              {
                `${pokeState.pokemon?.forms[pokeState.spriteType][pokeState.spriteIdx]?.name.split('-').slice(1).join(' ').toUpperCase()}`
              }
            </span>
          </h1>

          <div id='pokemon-types' className="flex justify-end w-fit">
            {pokeState?.pokemon?.types.map((element, idx) => {
              return (
                <div key={`pokemon-type-${idx}`} id={`type${element.slot}`} className="w-10 h-10 ml-2 flex justify-center items-center">
                  <TypeBadge type={element.type.name} />
                </div>
              )
            })}
          </div>
        </div>

        {/* POKEMON GENUS AND TYPE(S) */}
        <div id='basic-info-bot' className="flex justify-between items-end">

          <h1 id='pokemon-number' className="font-medium lg:font-semibold text-xl">{pokeState?.pokemon?.id ? `#${pokeState.pokemon?.id.toString().padStart(4, '0')}` : '#----'}</h1>

          <h1 id='pokemon-category' className="">
            {pokeState?.pokemon?.name ?
              `The ${pokeState.pokemon.genus}`
              :
              `--`
            }
          </h1>
        </div>
        <Abilities />
    </div>
  )

}

export default BasicInfo;