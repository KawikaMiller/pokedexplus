import React, { useState, useEffect } from "react";

import MT from "@/app/lib/clientmaterialtailwind";

import teamSlice from "@/app/reduxStore/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import { calculateStatTotal, capitalizeWord, natureModifiers, removeHyphen } from "@/app/lib/helpers";
import TypeBadge from "../../accessory/TypeBadge";

function InfoPanel() {

  const teamState = useSelector(state => state.team);
  const dispatch = useDispatch();
  const { setFocus, addToTeam } = teamSlice.actions

  const [bodyIdx, setBodyIdx] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const statLabelStyle = `before:absolute before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-full before:left-0 before before:text-xs`

  const handleArrowClick = (value) => {
    let newIdx = bodyIdx + value;

    if (newIdx >= 3) {
      setBodyIdx(0)
    } else if (newIdx < 0) {
      setBodyIdx(1)
    } else {
      setBodyIdx(bodyIdx + value)
    }
  }

  const limitNumber = (e, key) => {
    if (key.toUpperCase() === 'EV') {
      e.target.value.length > 3 ?
        e.target.value = e.target.value.substring(0, 3)
        :
        e.target.value == 0 ? e.target.value = '' :
          e.target.value > 255 ? e.target.value = 255 : null
    } else if (key.toUpperCase() === 'IV') {
      e.target.value.length > 2 ?
        e.target.value = e.target.value.substring(0, 2)
        :
        e.target.value == 0 ? e.target.value = '' : e.target.value > 31 ? e.target.value = 31 : null
    } else if (key.toUpperCase() === 'LVL') {
      e.target.value > 100 ? e.target.value = 100 :
        !e.target.value ? e.target.value = '' : null
    }
    return e.target.value;
  }


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

              <div className="flex justify-between">
                {/* LEVEL */}
                <div className="flex relative w-1/4">
                  <div className="w-full text-white rounded-bl-md text-center before:content-['Lvl'] before:absolute before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-full before:left-0 before before:text-xs">
                    <input onChange={(e) => limitNumber(e, 'LVL')} id='level' type="number" value={teamState.team[teamState.focus].level || ''} placeholder="LVL" className={`w-full h-fit text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`} />
                  </div>
                </div>

                {/* NICKNAME*/}
                <div className="flex relative w-[71%]">
                  <div className="w-full text-white rounded-bl-md text-center before:content-['Nickname'] before:absolute before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-full before:left-0 before before:text-xs">
                    <input id='nickname' maxLength={12} value={teamState.team[teamState.focus].nickname || ''} placeholder="Nickname" className={`w-full h-fit text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`} />
                  </div>
                </div>
              </div>

              {/* NATURE */}
              <div className="flex relative">
                <div className="w-full text-white rounded-bl-md text-center before:content-['Nature'] before:absolute before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-full before:left-0 before before:text-xs">
                  <select id='nature' className={`w-full h-fit text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`}>
                    {
                      natureModifiers.map(nature => <option className="rounded-md">{nature.name}</option>)
                    }
                  </select>
                </div>
              </div>

              {
                teamState.team[teamState.focus].stats?.map((stat, idx) => (
                  <div className="flex justify-center items-center">
                    <div className="bg-blue-500 w-2/5 text-white rounded-bl-md px-1 text-center relative">
                      <p
                        className={
                          `before:content-['${stat.name}'] ${statLabelStyle}`
                        }
                      >
                        {teamState.team[teamState.focus].stats ? calculateStatTotal(teamState.team[teamState.focus].stats[idx], teamState.team[teamState.focus].level, teamState.team[teamState.focus].nature) : '---'}
                      </p>
                    </div>

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
                )) || null
              }

              {/* ABILITIES */}
              <div className="flex relative">
                <div className="w-full text-white rounded-bl-md text-center before:content-['Ability'] before:absolute before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-full before:left-0 before before:text-xs">
                  <select id='battle-ability' className={`w-full h-fit text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`}>
                    {
                      teamState.team[teamState.focus].name ? teamState.team[teamState.focus].abilities.map(ability => <option className="rounded-md">{capitalizeWord(removeHyphen(ability.name))}</option>) : null
                    }
                  </select>
                </div>
              </div>

              {/* HELD ITEM */}
              <div className="flex relative">
                <div className="w-full text-white rounded-bl-md text-center before:content-['Held_Item'] before:absolute before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-full before:left-0 before before:text-xs">
                  <select id='held-item' className={`w-full h-6 text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`}>
                    <option>TBA</option>
                  </select>
                </div>
              </div>

              {/* MOVE 1 */}
              <div className="flex relative">
                <div className="w-full text-white rounded-bl-md text-center before:content-['Move_1'] before:absolute before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-full before:left-0 before before:text-xs">
                  <select id='battle-move-1' className={`w-full h-fit text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`}>
                    {
                      teamState.team[teamState.focus].name ? teamState.team[teamState.focus].moves.map(move => <option className="rounded-md" value={move.name}>{capitalizeWord(removeHyphen(move.name))}</option>) : null
                    }
                  </select>
                </div>
              </div>

              {/* MOVE 2 */}
              <div className="flex relative">
                <div className="w-full text-white rounded-bl-md text-center before:content-['Move_2'] before:absolute before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-full before:left-0 before before:text-xs">
                  <select id='battle-move-2' className={`w-full h-fit text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`}>
                    {
                      teamState.team[teamState.focus].name ? teamState.team[teamState.focus].moves.map(move => <option className="rounded-md" value={move.name}>{capitalizeWord(removeHyphen(move.name))}</option>) : null
                    }
                  </select>
                </div>
              </div>

              {/* MOVE 3 */}
              <div className="flex relative">
                <div className="w-full text-white rounded-bl-md text-center before:content-['Move_3'] before:absolute before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-full before:left-0 before before:text-xs">
                  <select id='battle-move-3' className={`w-full h-fit text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`}>
                    {
                      teamState.team[teamState.focus].name ? teamState.team[teamState.focus].moves.map(move => <option className="rounded-md" value={move.name}>{capitalizeWord(removeHyphen(move.name))}</option>) : null
                    }
                  </select>
                </div>
              </div>

              {/* MOVE 4 */}
              <div className="flex relative">
                <div className="w-full text-white rounded-bl-md text-center before:content-['Move_4'] before:absolute before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-full before:left-0 before before:text-xs">
                  <select id='battle-move-4' className={`w-full h-fit text-center rounded-b-md rounded-tr-md text-black focus-visible:bg-light-blue-300 focus-visible:text-white`}>
                    {
                      teamState.team[teamState.focus].name ? teamState.team[teamState.focus].moves.map(move => <option className="rounded-md" value={move.name}>{capitalizeWord(removeHyphen(move.name))}</option>) : null
                    }
                  </select>
                </div>
              </div>
            </form>
            :
            null
        }
      </div>

      {/* <div key='info-panel-body-right-arrow' onClick={() => handleArrowClick(1)} >
          <MT.Button className="h-full p-2">{`>`}</MT.Button>
        </div> */}

      {/* </div> */}

      <div className="fixed w-full m-auto left-0 bot-1/4 flex justify-center">
        <MT.Alert id='ev-alert' color="red" open={showAlert} className="border rounded-md w-1/4 flex justify-center">
          EVs cannot total more than 510
        </MT.Alert>
      </div>
    </>
  )

}

export default InfoPanel;