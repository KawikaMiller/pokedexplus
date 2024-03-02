import React from "react";
import { useSelector } from "react-redux";
import {  capitalizeWord, removeHyphen } from "@/app/lib/helpers";

function InfoPanelMoves() {

  const teamState = useSelector(state => state.team);

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

export default InfoPanelMoves