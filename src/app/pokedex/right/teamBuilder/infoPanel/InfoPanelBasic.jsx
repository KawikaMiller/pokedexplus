import React from "react";
import { useSelector } from "react-redux";
import { limitNumber } from "@/app/lib/helpers";

function InfoPanelBasic() {

  const teamState = useSelector(state => state.team);

  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col relative w-1/4">
        <p className="w-fit text-white text-center bg-blue-500 rounded-t-md px-1 bottom-full left-0 before text-xs">
          Lvl
        </p>
        <input
          id='level'
          placeholder="LVL"
          type="number"
          value={teamState.team[teamState.focus].level || null}
          onChange={(e) => limitNumber(e, 'LVL')}
          className={`h-fit text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`} />
      </div>

      <div className="flex flex-col relative">
        <p className="w-fit text-white text-center bg-blue-500 rounded-t-md px-1 bottom-full left-0 before text-xs">
          Nickname
        </p>
        <input
          id='nickname'
          placeholder="Nickname"
          type='text'
          value={teamState.team[teamState.focus].nickname}
          className={`w-full h-fit text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`}>
        </input>
      </div>
    </div>
  )
}

export default InfoPanelBasic;