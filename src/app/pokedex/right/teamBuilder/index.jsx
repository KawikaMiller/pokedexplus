import React, { useState } from "react";

import { useSelector } from "react-redux";
import pokeSlice from "@/app/reduxStore/pokeSlice";

import MT from "@/app/lib/clientmaterialtailwind";
import { capitalizeWord } from "@/app/lib/helpers";
import TypeBadge from "../../accessory/TypeBadge";
import TeamSlot from "./TeamSlot";
import TypeMatchup from "../../left/TypeMatchup";
import BaseStats from "../../left/BaseStats";
import InfoPanel from "./InfoPanel";
import TeamOptions from "./TeamOptions";

function TeamBuilder (props) {

  const [showDialog, setShowDialog] = useState(false)

  const handleDialog = () => {
    setShowDialog(!showDialog)
  }

  const pokeState = useSelector(state => state.pokemon)

  return(
    <>
      <div id='right-body-team-builder' className="flex flex-col justify-between min-h-0 lg:h-full">
      <div id="right-body-top-team-builder" className="flex flex-col lg:flex-row h-fit lg:h-[75%]">
          <div id='team-member-container' className="flex-col lg:flex lg:flex-wrap bg-black/25 rounded-md m-2 w-full min-h-fit justify-evenly items-center border">
            <TeamSlot handleDialog={handleDialog} position={0}/>
            <TeamSlot handleDialog={handleDialog} position={1}/>
            <TeamSlot handleDialog={handleDialog} position={2}/>
            <TeamSlot handleDialog={handleDialog} position={3}/>
            <TeamSlot handleDialog={handleDialog} position={4}/>
            <TeamSlot handleDialog={handleDialog} position={5}/>
          </div>
        </div>

        <div id="right-body-bot-team-builder" className="flex min-h-0">
          <div id='info-panel-container' className="flex flex-col mx-2 justify-between w-full h-full lg:min-w-0 lg:w-3/4 border">
            <InfoPanel />
          </div>
          <div id='abilities-and-base-stats-container' className="flex flex-col justify-between mx-2 h-full w-1/3 lg:w-1/4 border">
            <TeamOptions />
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