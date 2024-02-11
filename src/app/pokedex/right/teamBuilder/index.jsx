import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import pokeSlice from "@/app/reduxStore/pokeSlice";
import teamSlice from "@/app/reduxStore/teamSlice";

import MT from "@/app/lib/clientmaterialtailwind";
import { capitalizeWord } from "@/app/lib/helpers";
import TypeBadge from "../../accessory/TypeBadge";
import TeamSlot from "./TeamSlot";
import TypeMatchup from "../../left/TypeMatchup";
import BaseStats from "../../left/BaseStats";
import InfoPanel from "./InfoPanel";
import TeamOptions from "./TeamOptions";

function TeamBuilder(props) {

  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false)
  const pokeState = useSelector(state => state.pokemon)
  const teamState = useSelector(state => state.team)
  const { setTeamName } = teamSlice.actions;

  const updateTeamName = (e) => {
    dispatch(setTeamName(e.target.value))
  }

  const handleDialog = () => {
    setShowDialog(!showDialog)
  }


  return (
    <>
      <div id='right-body-team-builder-container' className="border flex flex-col justify-between min-h-0 lg:h-full m-2">

        <div id='right-body-team-builder-header' className="h-[10%] w-full flex justify-between items-center space-x-2 p-0.5 bg-black/50 border-b">

          <div className="relative h-1/2 w-2/3 top-2">
            <div className="w-full before:absolute before:content-['Team_Name'] before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-full before:left-0 before before:text-xs">
              <input id='team-name' onChange={(e) => updateTeamName(e)} placeholder="Team Name" value={teamState.teamName} className="rounded-b-md rounded-tr-md text-black w-full px-1 " />
            </div>
          </div>

          <div className="relative h-1/2 w-1/3 top-2">
            <div className="w-full before:absolute before:content-['Game_Version'] before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-full before:left-0 before before:text-xs">
              <select className="rounded-b-md rounded-tr-md text-black w-full px-1 ">
                <option>Gen I</option>
              </select>
            </div>
          </div>

        </div>

        <div id='right-body-team-builder-main' className="flex justify-between min-h-0 h-full bg-black/25 border-b">
          <div id='team-member-container' className="flex-col lg:flex min-h-fit justify-evenly items-center w-2/3 border-r">
            <div className="min-h-0 w-full flex flex-col justify-evenly items-center p-0.5">
              <TeamSlot handleDialog={handleDialog} position={0} />
              <TeamSlot handleDialog={handleDialog} position={1} />
              <TeamSlot handleDialog={handleDialog} position={2} />
              <TeamSlot handleDialog={handleDialog} position={3} />
              <TeamSlot handleDialog={handleDialog} position={4} />
              <TeamSlot handleDialog={handleDialog} position={5} />
            </div>
          </div>

          <div id="right-body-right-team-builder" className="flex flex-col min-h-0 w-1/3">
            <div id='info-panel-container' className="flex flex-col justify-between w-full h-full lg:w-full px-1">
              <InfoPanel />
            </div>
          </div>
        </div>

        <div id='right-body-team-builder-footer'>
          <TeamOptions />
        </div>

      </div>

      <MT.Dialog open={showDialog} handler={handleDialog}>
        <MT.DialogHeader className="flex justify-between">
          <div>Choose Your Pokemon</div>
          <MT.Button color="red" onClick={handleDialog}>X</MT.Button>
        </MT.DialogHeader>
        <MT.DialogBody className="flex justify-between">

        </MT.DialogBody>
        <MT.DialogFooter></MT.DialogFooter>
      </MT.Dialog>
    </>
  )

}

export default TeamBuilder;