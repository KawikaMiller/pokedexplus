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
import InfoPanel from "./infoPanel/InfoPanel";
import TeamOptions from "./TeamOptions";

function TeamBuilder(props) {

  const dispatch = useDispatch();
  const pokeState = useSelector(state => state.pokemon);
  const teamState = useSelector(state => state.team);

  const { setTeamName } = teamSlice.actions;

  const [showDialog, setShowDialog] = useState(false);
  const [editTeamName, setEditTeamName] = useState(false);

  const updateTeamName = (e) => {
    dispatch(setTeamName(e.target.value))
  }

  const handleDialog = () => {
    setShowDialog(!showDialog)
  }


  return (
    <>
      <div id='right-body-team-builder-container' className="border flex flex-col justify-between min-h-0 lg:h-full m-2">

        <div id='right-body-team-builder-header' className="h-16 lg:h-[10%] w-full flex flex-col justify-center lg:flex-row lg:justify-between lg:items-center lg:space-x-2 p-0.5 bg-black/50 border-b">

          {
            editTeamName ?
              <div className="relative w-full lg:w-2/3 lg:top-2">
                <div className="w-full before:absolute before:content-['Team_Name'] before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-full before:left-0 before before:text-xs">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!e.target['team-name'].value){
                      dispatch(setTeamName('missingTeamName'))
                    }
                    setEditTeamName(false)
                  }}
                    className="flex"
                  >
                    <input id='team-name' onChange={(e) => updateTeamName(e)} placeholder="Team Name" value={teamState.teamName} autoFocus={true} className="rounded-b-md rounded-tr-md text-black w-full px-1 text-2xl lg:text-md" />
                    <MT.Button type="submit" color="blue" className="rounded-none rounded-r-md">Save</MT.Button>
                  </form>
                </div>
              </div>
              :
              <p className="hover:bg-white/50 text-2xl text-center" onClick={() => {
                setEditTeamName(true);
              }}>
                {teamState.teamName}
              </p>
          }

          <div className="relative h-1/2 w-1/3 top-4 lg:top-2">
            <div className="w-full before:absolute before:content-['Game_Version'] before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-full before:left-0 before before:text-xs">
              <select className="rounded-b-md rounded-tr-md text-black w-full lg:px-1">
                <option>Gen I</option>
              </select>
            </div>
          </div>

        </div>

        <div id='right-body-team-builder-main' className="flex justify-between min-h-0 h-full bg-black/25 border-b">
          <div id='team-member-container' className="flex-col lg:flex min-h-fit justify-evenly items-center w-full lg:w-1/2 border-r p-2">
            <TeamSlot handleDialog={handleDialog} position={0} />
            <TeamSlot handleDialog={handleDialog} position={1} />
            <TeamSlot handleDialog={handleDialog} position={2} />
            <TeamSlot handleDialog={handleDialog} position={3} />
            <TeamSlot handleDialog={handleDialog} position={4} />
            <TeamSlot handleDialog={handleDialog} position={5} />
          </div>

          <div id="right-body-right-team-builder" className="hidden lg:flex flex-col min-h-0 w-1/2">
            <div id='info-panel-container' className="flex flex-col justify-between w-full h-full lg:w-full p-1">
              <InfoPanel />
            </div>
          </div>
        </div>

        <div id='right-body-team-builder-footer' className="py-2">
          <TeamOptions />
        </div>

      </div>

      {/* <MT.Dialog open={showDialog} handler={handleDialog}>
        <MT.DialogHeader className="flex justify-between">
          <div>Choose Your Pokemon</div>
          <MT.Button color="red" onClick={handleDialog}>X</MT.Button>
        </MT.DialogHeader>
        <MT.DialogBody className="flex justify-between">

        </MT.DialogBody>
        <MT.DialogFooter></MT.DialogFooter>
      </MT.Dialog> */}

      <MT.Dialog key='edit-pokemon-dialog' id='edit-pokemon-dialog' open={showDialog} handler={handleDialog}>
        <MT.DialogHeader className="bg-pkRed rounded-t-md text-white border-b-4 border-black flex justify-between">
          <p>Edit Pokemon</p>
          <MT.Button variant="outlined" color="white" size="sm" onClick={handleDialog}>X</MT.Button>
        </MT.DialogHeader>
        <MT.DialogBody className="bg-blue-gray-600">
          <InfoPanel />
        </MT.DialogBody>
        <MT.DialogFooter className="border-t-4 border-black">
          Footer
        </MT.DialogFooter>
      </MT.Dialog>
    </>
  )

}

export default TeamBuilder;