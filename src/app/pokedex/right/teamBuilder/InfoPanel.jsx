import React, { useState, useEffect } from "react";

import MT from "@/app/lib/clientmaterialtailwind";

import teamSlice from "@/app/reduxStore/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import { calculateStatTotal, capitalizeWord, natureModifiers, removeHyphen, limitNumber } from "@/app/lib/helpers";
import TypeBadge from "../../accessory/TypeBadge";

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
            <form id='info-panel-form' onChange={(e) => handleChangeForm(e)} className="w-full h-full text-black flex flex-col justify-evenly">

              {/* STAT VALUES */}
              {
                teamState.team[teamState.focus].stats?.map((stat, idx) => (
                  <div>
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

              {/* NATURE */}
              <div className="flex flex-col relative">
                <p className="w-fit text-white text-center bg-blue-500 rounded-t-md px-1 bottom-full left-0 before text-xs">
                  Nature
                </p>
                <select id='nature' className={`w-full h-fit text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`}>
                  {
                    natureModifiers.map(nature => <option className="rounded-md">{nature.name}</option>)
                  }
                </select>
              </div>

              {/* ABILITIES */}
              <div className="flex flex-col relative">
                <p className="w-fit text-white text-center bg-blue-500 rounded-t-md px-1 bottom-full left-0 before text-xs">
                  Ability
                </p>
                <select id='battle-ability' className={`w-full h-fit text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`}>
                  {
                    teamState.team[teamState.focus].name ? teamState.team[teamState.focus].abilities.map(ability => <option className="rounded-md">{capitalizeWord(removeHyphen(ability.name))}</option>) : null
                  }
                </select>
              </div>

              {/* HELD ITEM */}
              <div className="flex flex-col relative">
                <p className="w-fit text-white text-center bg-blue-500 rounded-t-md px-1 bottom-full left-0 before text-xs">
                  Held Item
                </p>
                <select id='held-item' className={`w-full h-6 text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`}>
                  <option>TBA</option>
                </select>
              </div>


              {/* MOVES */}

              {
                teamState.team[teamState.focus].battle.moves.map((el, idx) => (
                  <div className="flex flex-col relative">
                  <p className="w-fit text-white text-center bg-blue-500 rounded-t-md px-1 bottom-full left-0 before text-xs">
                    {`Move ${idx + 1}`}
                  </p>
                  <select id='battle-move-1' className={`w-full h-fit text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`}>
                    {
                      teamState.team[teamState.focus].name ? teamState.team[teamState.focus].moves.map(move => <option className="rounded-md" value={move.name}>{capitalizeWord(removeHyphen(move.name))}</option>) : null
                    }
                  </select>
                </div>
                ))
              }


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