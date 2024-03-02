import React, { useState, useEffect } from "react";

import MT from "@/app/lib/clientmaterialtailwind";

import teamSlice from "@/app/reduxStore/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import { calculateStatTotal, capitalizeWord, natureModifiers, removeHyphen, limitNumber } from "@/app/lib/helpers";

function InfoPanelNatureAndAbility() {

  const teamState = useSelector(state => state.team);

  return (
    <div className="flex flex-wrap justify-between">
      {/* NATURE */}
      <div className="flex flex-col relative w-[48%]">
        <p className="w-fit text-white text-center bg-blue-500 rounded-t-md px-1 bottom-full left-0 before text-xs">
          Nature
        </p>
        <select id='nature' className={`w-full h-fit text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`}>
          {
            natureModifiers.map(nature => <option className="rounded-md">{nature.name}</option>)
          }
        </select>
      </div>

      {/* ABILITIES */}
      <div className="flex flex-col relative w-[48%]">
        <p className="w-fit text-white text-center bg-blue-500 rounded-t-md px-1 bottom-full left-0 before text-xs">
          Ability
        </p>
        <select id='battle-ability' className={`w-full h-fit text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`}>
          {
            teamState.team[teamState.focus].name ? teamState.team[teamState.focus].abilities.map(ability => <option className="rounded-md">{capitalizeWord(removeHyphen(ability.name))}</option>) : null
          }
        </select>
      </div>
    </div>
  )

}

export default InfoPanelNatureAndAbility