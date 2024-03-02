import React, { useState, useEffect } from "react";

import teamSlice from "@/app/reduxStore/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import { calculateStatTotal, capitalizeWord, natureModifiers, removeHyphen, limitNumber } from "@/app/lib/helpers";

function InfoPanelStats() {

  const teamState = useSelector(state => state.team);
  const dispatch = useDispatch();
  const { setFocus, addToTeam } = teamSlice.actions

  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="flex flex-wrap justify-between">
      {
        teamState.team[teamState.focus].stats?.map((stat, idx) => (
          <div className={`w-[48%] mb-2`}>
            <p className="text-white w-fit bg-blue-500 rounded-t-md px-1 bottom-full left-0 before text-xs">
              {stat.name}
            </p>
            <div className="flex justify-center items-center">
              <p className="bg-blue-500 w-2/5 text-white rounded-bl-md px-1 text-center relative">
                {teamState.team[teamState.focus].stats ? calculateStatTotal(teamState.team[teamState.focus].stats[idx], teamState.team[teamState.focus].level, teamState.team[teamState.focus].nature) : '---'}
              </p>

              <input
                id={`${stat.name.toLowerCase()}Iv`} placeholder="IV" type="number"
                className="w-[30%] text-center border-r border-black/50"
                onChange={(e) => limitNumber(e, 'IV')}
                value={teamState.team[teamState.focus].stats[idx].iv || null}
              />

              <input
                id={`${stat.name.toLowerCase()}Ev`} placeholder="EV" type="number"
                className="w-[30%] rounded-r-md text-center"
                onChange={(e) => limitNumber(e, 'EV')}
                value={teamState.team[teamState.focus].stats[idx].ev || null} />
            </div>
          </div>
        )) || null
      }
    </div>
  )
}

export default InfoPanelStats;