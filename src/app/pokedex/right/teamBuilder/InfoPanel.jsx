import React, { useState, useEffect } from "react";

import MT from "@/app/lib/clientmaterialtailwind";

import teamSlice from "@/app/reduxStore/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import { calculateStatTotal, capitalizeWord, natureModifiers } from "@/app/lib/helpers";
import TypeBadge from "../../accessory/TypeBadge";

function InfoPanel() {

  const teamState = useSelector(state => state.team);
  const dispatch = useDispatch();
  const { setFocus, addToTeam } = teamSlice.actions

  const [bodyIdx, setBodyIdx] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

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

  const limitNumber = (e, max) => {
    if (max === 3) {
      e.target.value.length > max ?
        e.target.value = e.target.value.substring(0, max)
        :
        e.target.value > 255 ? e.target.value = 255 : null
    } else {
      e.target.value.length > max ?
        e.target.value = e.target.value.substring(0, max)
        :
        e.target.value == 0 ? e.target.value = 1 : e.target.value > 31 ? e.target.value = 31 : null
    }
    return e.target.value;
  }

  const handleUpdateNature = (nature) => {
    let temp = JSON.parse(JSON.stringify(teamState.team[teamState.focus]));
    temp.nature = nature;
    dispatch(addToTeam({
      pokemon: temp,
      position: teamState.focus
    }))
  }

  const handleUpdateStats = (e) => {

    let evTotal = Number(e.target.form.hpEv.value) + Number(e.target.form.atkEv.value) + Number(e.target.form.defEv.value) + Number(e.target.form.spatkEv.value) + Number(e.target.form.spdefEv.value) + Number(e.target.form.spdEv.value);

    if (evTotal > 510) {
      setShowAlert(true)
      e.target.value = ''
      setTimeout(() => setShowAlert(false), 3500)
    } else {
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

      dispatch(addToTeam({
        pokemon: temp,
        position: teamState.focus
      }))
    }
  }

  return (
    <>

      {/* INFO PANEL HEADER */}
      <div key='info-panel-header' className="flex justify-between p-0.5  border-b">
        {/* NAME */}
        <div key='info-panel-name'>
          {
            teamState.team[teamState.focus]?.name ?
              capitalizeWord(teamState.team[teamState.focus].name)
              : `missingName`
          }
        </div>
        {/* TYPES */}
        <div key='info-panel-types' className={`flex ${teamState.team[teamState.focus].types?.length > 1 ? `justify-between` : `justify-center`} w-16`}>
          {
            teamState.team[teamState.focus].types ? teamState.team[teamState.focus].types.map(el => <TypeBadge type={el.type.name} size={6} />) : null
          }
        </div>
      </div>

      {/* INFO PANEL MAIN BODY */}
      <div id='info-panel-body' key='info-panel-body' className="h-full">

        {
          // BATTLE INFORMATION
          <>
            <form id='info-panel-form' onChange={(e) => handleUpdateStats(e)} className="w-full h-full text-black flex flex-col justify-evenly">

                {/* HP */}
                <div className="flex justify-center items-center">
                  <div className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center before:content-['HP'] before:relative before:bottom-4 before:right-2 before:text-xs">
                    <p className="flex justify-center items-end max-h-0">
                      {calculateStatTotal(teamState.team[teamState.focus].stats[0], teamState.team[teamState.focus].level, teamState.team[teamState.focus].nature)}
                    </p>
                  </div>
                  <input className="w-1/3 my-1 text-center border-r border-black/50" id='hpIv' placeholder="IV" value={teamState.team[teamState.focus].stats[0].iv || null} type="number" onChange={(e) => limitNumber(e, 2)}></input>
                  <input className="w-1/3 rounded-r-md my-1 text-center" id='hpEv' placeholder="EV" type="number" onChange={(e) => limitNumber(e, 3)} value={teamState.team[teamState.focus].stats[0].ev || null}></input>
                </div>

                {/* ATK */}
                <div className="flex justify-center items-center">
                  <div className="bg-blue-500 w-2/5 text-white rounded-l-md px-1 text-center  relative">
                    <p className="before:content-['ATK'] before:absolute before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-[81%] before:left-0 before before:text-xs">
                      {calculateStatTotal(teamState.team[teamState.focus].stats[1], teamState.team[teamState.focus].level, teamState.team[teamState.focus].nature)}
                    </p>
                  </div>
                  <input className="w-[30%] my-1 text-center border-r border-black/50" id='atkIv' placeholder="IV" value={teamState.team[teamState.focus].stats[1].iv || null} type="number" onChange={(e) => limitNumber(e, 2)}></input>
                  <input className="w-[30%] rounded-r-md my-1 text-center" id='atkEv' placeholder="EV" onChange={(e) => limitNumber(e, 3)} value={teamState.team[teamState.focus].stats[1].ev || null} type="number"></input>
                </div>

                {/* DEF */}
                <div className="flex justify-center items-center">
                  <p className="bg-blue-500 w-2/5 text-white rounded-l-md px-1 text-center">DEF</p>
                  <input className="w-[30%] my-1 text-center border-r border-black/50" id='defIv' placeholder="IV" value={teamState.team[teamState.focus].stats[2].iv || null} type="number" onChange={(e) => limitNumber(e, 2)}></input>
                  <input className="w-[30%] rounded-r-md my-1 text-center" id='defEv' placeholder="EV" onChange={(e) => limitNumber(e, 3)} value={teamState.team[teamState.focus].stats[2].ev || null} type="number"></input>
                </div>

                {/* SPEED */}
                <div className="flex justify-center items-center">
                  <p className="bg-blue-500 w-2/5 text-white rounded-l-md px-1 text-center">SPD</p>
                  <input className="w-[30%] my-1 text-center border-r border-black/50" id='spdIv' placeholder="IV" value={teamState.team[teamState.focus].stats[5].iv || null} type="number" onChange={(e) => limitNumber(e, 2)}></input>
                  <input className="w-[30%] rounded-r-md my-1 text-center" id='spdEv' placeholder="EV" onChange={(e) => limitNumber(e, 3)} value={teamState.team[teamState.focus].stats[5].ev || null} type="number"></input>
                </div>

                {/* SPECIAL ATTACK */}
                <div className="flex justify-center items-center">
                  <div className="bg-blue-500 w-2/5 text-white rounded-l-md px-1 text-center  relative">
                    <p className="before:content-['SPATK'] before:absolute before:bg-blue-500 before:rounded-t-md before:px-1 before:bottom-[81%] before:left-0 before before:text-xs">
                      {calculateStatTotal(teamState.team[teamState.focus].stats[3], teamState.team[teamState.focus].level, teamState.team[teamState.focus].nature)}
                    </p>
                  </div>
                  <input className="w-[30%] my-1 text-center border-r border-black/50" id='spatkIv' placeholder="IV" value={teamState.team[teamState.focus].stats[3].iv || null} type="number" onChange={(e) => limitNumber(e, 2)}></input>
                  <input className="w-[30%] rounded-r-md my-1 text-center" id='spatkEv' placeholder="EV" onChange={(e) => limitNumber(e, 3)} value={teamState.team[teamState.focus].stats[3].ev || null} type="number"></input>
                </div>

                {/* SPECIAL DEFENSE */}
                <div className="flex justify-center items-center">
                  <p className="bg-blue-500 w-2/5 text-white rounded-l-md px-1 text-center">SPDEF</p>
                  <input className="w-[30%] my-1 text-center border-r border-black/50" id='spdefIv' placeholder="IV" value={teamState.team[teamState.focus].stats[4].iv || null} type="number" onChange={(e) => limitNumber(e, 2)}></input>
                  <input className="w-[30%] rounded-r-md my-1 text-center" id='spdefEv' placeholder="EV" onChange={(e) => limitNumber(e, 3)} value={teamState.team[teamState.focus].stats[4].ev || null} type="number"></input>
                </div>

              {/* MOVE 1 */}
              <div className="flex justify-center items-center mx-1">
                <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center h-full">Move</p>
                <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                  {
                    teamState.team[teamState.focus].name ? teamState.team[teamState.focus].moves.map(move => <option className="rounded-md">{move.name}</option>) : null
                  }
                </select>
              </div>

              {/* MOVE 2 */}
              <div className="flex justify-center items-center mx-1">
                <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center h-full">Move</p>
                <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                  {
                    teamState.team[teamState.focus].name ? teamState.team[teamState.focus].moves.map(move => <option className="rounded-md">{move.name}</option>) : null
                  }
                </select>
              </div>

              {/* MOVE 3 */}
              <div className="flex justify-center items-center mx-1">
                <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center h-full">Move</p>
                <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                  {
                    teamState.team[teamState.focus].name ? teamState.team[teamState.focus].moves.map(move => <option className="rounded-md">{move.name}</option>) : null
                  }
                </select>
              </div>

              {/* MOVE 4 */}
              <div className="flex justify-center items-center mx-1">
                <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center h-full">Move</p>
                <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                  {
                    teamState.team[teamState.focus].name ? teamState.team[teamState.focus].moves.map(move => <option className="rounded-md">{move.name}</option>) : null
                  }
                </select>
              </div>

              {/* HELD ITEM */}
              <div className="flex justify-center items-center mx-1">
                <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center h-full">Item</p>
                <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                  <option>TBA</option>
                </select>
              </div>

              {/* ABILITIES */}
              <div className="flex justify-center items-center mx-1">
                <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center h-full">Abil</p>
                <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                  {
                    teamState.team[teamState.focus].name ? teamState.team[teamState.focus].abilities.map(ability => <option className="rounded-md">{ability.name}</option>) : null
                  }
                </select>
              </div>
            </form>
          </>
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