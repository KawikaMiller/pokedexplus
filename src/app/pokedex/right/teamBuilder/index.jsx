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
      <div id='right-body-team-builder' className="flex flex-col justify-between min-h-0 lg:h-full m-2">

        <div id='right-body-top-team-builder' className="h-1/5 w-full flex justify-between border p-0.5">
          <div id='team-name-and-gen-select' className="flex flex-col justify-center h-full border w-2/3 p-1">

            <div className="relative h-1/2 top-5">
              <div className="w-full before:absolute before:content-['Team_Name'] before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-full before:left-0 before before:text-xs">
                <input id='team-name' onChange={(e) => updateTeamName(e)} placeholder="Team Name" value={teamState.teamName} className="rounded-b-md rounded-tr-md text-black w-full px-1 " />
              </div>
            </div>

            <div className="relative h-1/2 top-5">
            <div className="w-full before:absolute before:content-['Game_Version'] before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-full before:left-0 before before:text-xs">
              <select className="rounded-b-md rounded-tr-md text-black w-full px-1 ">
                <option>Gen I</option>
              </select>
              </div>
            </div>

          </div>

          <div className="w-1/3 h-full min-h-0">
            <TeamOptions />
          </div>
        </div>

        <div id='right-body-bot-team-builder' className="border flex justify-between min-h-0 h-full">
          <div id='team-member-container' className="flex-col lg:flex bg-black/25 rounded-md min-h-fit justify-evenly items-center  w-2/3">
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
            <div id='info-panel-container' className="flex flex-col justify-between w-full h-full lg:w-full px-1 bg-black/50">
              <InfoPanel />
            </div>
            {/* <div id='abilities-and-base-stats-container' className="flex flex-col justify-between mx-2 h-1/4 w-full border"> */}

            {/* </div> */}
          </div>
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