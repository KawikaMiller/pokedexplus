import React, { useState, useEffect, Children } from "react";

import MT from "@/app/lib/clientmaterialtailwind";

import teamSlice from "@/app/reduxStore/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import TypeBadge from "../../../accessory/TypeBadge";

import { limitNumber } from "@/app/lib/helpers";

import InfoPanelStats from "./InfoPanelStats";
import InfoPanelInput from "./InfoPanelInput";

function InputContainer({ children }) {
  return (
    <div className="flex flex-wrap justify-between">
      {children}
    </div>
  )
}

function InfoPanel() {

  const teamState = useSelector(state => state.team);
  const dispatch = useDispatch();
  const { setFocus, addToTeam } = teamSlice.actions

  const [showAlert, setShowAlert] = useState(false);

  const handleChangeForm = (e) => {

    let evTotal = Number(e.target.form.hpEv.value) + Number(e.target.form.atkEv.value) + Number(e.target.form.defEv.value) + Number(e.target.form.spatkEv.value) + Number(e.target.form.spdefEv.value) + Number(e.target.form.spdEv.value);

    if (evTotal > 510) {
      // if EVs exceed 510, display error popup
      setShowAlert(true)
      e.target.value = ''
      setTimeout(() => setShowAlert(false), 3500)
    } else {
      // otherwise, update team member in state
      setShowAlert(false)
      let temp = JSON.parse(JSON.stringify(teamState.team[teamState.focus]));
      temp.stats[0].ev = Number(e.target.form.hpEv.value) || 0
      temp.stats[0].iv = Number(e.target.form.hpIv.value)

      temp.stats[1].ev = Number(e.target.form.atkEv.value) || 0
      temp.stats[1].iv = Number(e.target.form.atkIv.value)

      temp.stats[2].ev = Number(e.target.form.defEv.value) || 0
      temp.stats[2].iv = Number(e.target.form.defIv.value)

      temp.stats[3].ev = Number(e.target.form.spatkEv.value) || 0
      temp.stats[3].iv = Number(e.target.form.spatkIv.value)

      temp.stats[4].ev = Number(e.target.form.spdefEv.value) || 0
      temp.stats[4].iv = Number(e.target.form.spdefIv.value)

      temp.stats[5].ev = Number(e.target.form.spdEv.value) || 0
      temp.stats[5].iv = Number(e.target.form.spdIv.value)

      temp.nickname = e.target.form.nickname.value;
      temp.nature = e.target.form.nature.value;

      temp.battle.moves = [
        temp.moves.find(move => move.name === e.target.form['battle-move-1'].value),
        temp.moves.find(move => move.name === e.target.form['battle-move-2'].value),
        temp.moves.find(move => move.name === e.target.form['battle-move-3'].value),
        temp.moves.find(move => move.name === e.target.form['battle-move-4'].value),
      ]

      temp.level = Number(e.target.form.level.value);

      dispatch(addToTeam({
        pokemon: temp,
        position: teamState.focus
      }))
    }
  }

  return (
    <>

      {/* INFO PANEL MAIN BODY */}
      <div id='info-panel-body' key='info-panel-body' className="h-full">

        {
          teamState.team[teamState.focus].stats ?
            // BATTLE INFORMATION
            <form id='info-panel-form' onChange={(e) => handleChangeForm(e)} className="w-full h-full text-black flex flex-col justify-evenly space-y-2 lg:space-y-0">

              {/* LEVEL AND HELD ITEM */}
              <InputContainer>
                <InfoPanelInput
                  id='level'
                  label='LVL'
                  type='number'
                  value={teamState.team[teamState.focus].level}
                  onChange={(e) => limitNumber(e, 'LVL')}
                  classes='w-1/4'
                />

                <InfoPanelInput
                  id='nickname'
                  label='Nickname'
                  type='text'
                  value={teamState.team[teamState.focus].nickname}
                  classes='w-2/3'
                />
              </InputContainer>

              {/* NATURE AND ABILITY */}
              <InputContainer>
                <InfoPanelInput
                  htmlTag='select'
                  id='nature'
                  label='Nature'
                  classes='w-[48%]'
                />

                <InfoPanelInput
                  htmlTag='select'
                  id='battle-ability'
                  label='Ability'
                  classes='w-[48%]'
                />
              </InputContainer>

              {/* STAT VALUES */}
              <InfoPanelStats />

              {/* HELD ITEM */}
              <InfoPanelInput 
                htmlTag='select'
                id='held-item'
                label='Held Item'
                classes='w-full'
              />

              {/* MOVES */}
              <InputContainer>
                {
                  teamState.team[teamState.focus].battle.moves.map((el, idx) => (
                    <InfoPanelInput
                      htmlTag='select' 
                      id={`battle-move-${idx + 1}`}
                      label={`Move ${idx + 1}`}
                      classes='w-[48%] mb-2'
                    />
                  ))
                }
              </InputContainer>
              {/* <InfoPanelMoves /> */}


            </form>
            :
            null
        }
      </div>

      <div className="fixed w-full m-auto left-0 bot-1/4 flex justify-center">
        <MT.Alert id='ev-alert' color="red" open={showAlert} className="border rounded-md w-1/4 flex justify-center">
          EVs cannot total more than 510
        </MT.Alert>
      </div>
    </>
  )

}

export default InfoPanel;