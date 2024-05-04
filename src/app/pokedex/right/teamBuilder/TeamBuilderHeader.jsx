import React, { useState } from "react";
import MT from "@/app/lib/clientmaterialtailwind";
import { modalStyle, blueTagStyle } from "../../styles/tailwindClasses";
import { useScreenWidth } from "../../hooks/useScreenWidth";

import { useSelector, useDispatch } from "react-redux";
import teamSlice from "@/app/reduxStore/teamSlice";
import { removeHyphen, genLabels } from "@/app/lib/helpers";

function TeamBuilderHeader(props) {

  const dispatch = useDispatch();
  const teamState = useSelector(state => state.team)
  const { setTeamName, setTeamGeneration } = teamSlice.actions

  const [showDialog, setShowDialog] = useState(false)
  const screenWidth = useScreenWidth();

  const updateTeamName = (e) => {
    dispatch(setTeamName(e.target.value))
  }

  const updateTeamGeneration = (e) => {
    dispatch(setTeamGeneration(e.target.value))
  }

  const handleSubmitTeamName = (e) => {
    if (!teamState.teamName) {
      dispatch(setTeamName('missingTeamName'));
    }
    setShowDialog(false)
  }

  function TeamEdit(props) {

    return (
      <>
        <div className={`${blueTagStyle.container} ${screenWidth < 1280 ? 'mb-4 w-1/2' : 'w-2/3'}`}>
          <p className={`${blueTagStyle.label} font-bold ${screenWidth < 1280 ? `!text-lg` : null}`}>Team Name</p>
          <input id="team-name" placeholder="Team Name" onChange={(e) => updateTeamName(e)} value={teamState.teamName} className={`rounded-md rounded-tl-none text-black w-full px-1 text-lg`} ></input>
        </div>
  
        <div className={`${blueTagStyle.container} ${screenWidth < 1280 ? 'mb-4 w-1/2' : 'w-1/3'}`}>
          <p className={`${blueTagStyle.label} font-bold ${screenWidth < 1280 ? `!text-lg` : null}`}>Game</p>
          <select className={`rounded-md rounded-tl-none text-black text-lg w-full py-[3px] capitalize`} 
            onChange={(e) => updateTeamGeneration(e)}
            value={teamState.teamGeneration}
          >
            {
              Object.keys(genLabels).map(key => 
              <option value={key} className="capitalize">
                {removeHyphen(genLabels[key])}
              </option>)
            }
          </select>
        </div>
      </>
    )
  
  }

  return (
    <div id='right-body-team-builder-header' className="h-16 xl:h-[12.5%] w-full flex justify-between items-center px-2 md:justify-center xl:flex-row xl:justify-between xl:items-center xl:space-x-2 bg-red-500 border-black border-b-4">

      {
        screenWidth > 1280 ?
          <TeamEdit />
          :
          <div className={`w-full + ${blueTagStyle.container}`}>
            <p className={`${blueTagStyle.label}`}>Team Name</p>
            <div className="flex grow">
              <p className="hover:bg-white/50 text-2xl px-2 w-full bg-white/25 rounded-bl-md">
                {teamState.teamName || 'Team Name'}
              </p>

              <MT.Button onClick={() => setShowDialog(true)} type="submit" color="blue" className="w-1/4 rounded-none text-center rounded-r-md p-2">Edit</MT.Button>
            </div>
          </div>
      }

      {/* this dialog/modal shows only in smaller screen sizes */}
      <MT.Dialog className={modalStyle.container} open={showDialog} handler={() => setShowDialog(false)}>
        <MT.DialogHeader className={modalStyle.header}>Edit Team</MT.DialogHeader>
        <MT.DialogBody className={modalStyle.body}>
          <TeamEdit />
        </MT.DialogBody>
        <MT.DialogFooter className={modalStyle.footer}>
          <button className="bg-blue-500 py-2 px-4 rounded text-white font-bold" onClick={handleSubmitTeamName}>Save</button>
        </MT.DialogFooter>
      </MT.Dialog>

    </div>
  )

}

export default TeamBuilderHeader