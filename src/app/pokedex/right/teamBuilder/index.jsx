import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useScreenWidth } from "../../hooks/useScreenWidth";

import MT from "@/app/lib/clientmaterialtailwind";
import TeamSlot from "./TeamSlot";
import InfoPanel from "./infoPanel/InfoPanel";
import TeamOptions from "./TeamOptions";
import TeamBuilderHeader from "./TeamBuilderHeader";

function TeamBuilder(props) {

  const dispatch = useDispatch();
  const pokeState = useSelector(state => state.pokemon);
  const teamState = useSelector(state => state.team);

  const screenWidth = useScreenWidth()
  const [showDialog, setShowDialog] = useState(false);


  const handleDialog = () => {
    setShowDialog(!showDialog)
  }


  return (
    <>
      {/* Team Builder Container */}
      <div id='right-body-team-builder-container' className="flex flex-col justify-between min-h-0 xl:h-full">

        {/* Team Builder Header */}
        <TeamBuilderHeader />

        <div id='right-body-team-builder-main' className="flex justify-between min-h-0 h-full">
          <div id='team-member-container' className="flex-col xl:flex min-h-fit justify-evenly items-center w-full xl:w-1/2 border-r p-2">
            <TeamSlot handleDialog={handleDialog} position={0} />
            <TeamSlot handleDialog={handleDialog} position={1} />
            <TeamSlot handleDialog={handleDialog} position={2} />
            <TeamSlot handleDialog={handleDialog} position={3} />
            <TeamSlot handleDialog={handleDialog} position={4} />
            <TeamSlot handleDialog={handleDialog} position={5} />
          </div>

          {
            screenWidth < 1280 ?
              null
            :
              <div id="right-body-right-team-builder" className="flex flex-col min-h-0 w-1/2">
                <div id='info-panel-container' className="flex flex-col justify-between w-full h-full p-1">
                  <InfoPanel />
                </div>
              </div>
          }
        </div>

        <div id='right-body-team-builder-footer' className="py-2 bg-white rounded-b-md border-black border-t-4">
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

      {/* Dialog popup used for smaller screens/breakpoints */}
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