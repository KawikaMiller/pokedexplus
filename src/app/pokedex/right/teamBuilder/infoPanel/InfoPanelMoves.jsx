import React, { useState, useEffect } from "react";

import MT from "@/app/lib/clientmaterialtailwind";

import teamSlice from "@/app/reduxStore/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import { calculateStatTotal, capitalizeWord, natureModifiers, removeHyphen, limitNumber } from "@/app/lib/helpers";
import TypeBadge from "../../../accessory/TypeBadge";
import InfoPanelStats from "./InfoPanelStats";
import InfoPanelBasic from "./InfoPanelBasic";
import InfoPanelNatureAndAbility from "./InfoPanelNatureAndAbility";

export function InfoPanelMoves() {

  const teamState = useSelector(state => state.team);
  const dispatch = useDispatch();
  const { setFocus, addToTeam } = teamSlice.actions

  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="flex flex-wrap justify-between">
      {
        teamState.team[teamState.focus].battle.moves.map((el, idx) => (
          <div className="flex flex-col relative w-[48%] mb-2">
            <p className="w-fit text-white text-center bg-blue-500 rounded-t-md px-1 bottom-full left-0 before text-xs">
              {`Move ${idx + 1}`}
            </p>
            <select id={`battle-move-${idx + 1}`} className={`w-full h-fit text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`}>
              {
                teamState.team[teamState.focus].name ? teamState.team[teamState.focus].moves.map(move => <option className="rounded-md" value={move.name}>{capitalizeWord(removeHyphen(move.name))}</option>) : null
              }
            </select>
          </div>
        ))
      }
    </div>
  )

}