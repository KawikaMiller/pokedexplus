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
      <div key='info-panel-container' className="w-full h-full bg-black/50">
        {/* INFO PANEL HEADER */}
        <div key='info-panel-header' className="flex justify-between p-0.5 h-1/4">
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
        <div id='info-panel-body' key='info-panel-body' className="flex justify-between h-3/4">
          <div key='info-panel-body-left-arrow' onClick={() => handleArrowClick(-1)}>
            <MT.Button className="h-full p-2">{`<`}</MT.Button>
          </div>
          <div id="info-panel-body-info" key='info-panel-body-info' className="grow flex flex-col justify-between items-center h-full w-full px-0.5">
            {
              bodyIdx === 0 ?
                // BATTLE INFORMATION
                <form key='info-panel-battle' className="w-full h-full flex flex-col justify-evenly">
                  {/* MOVE 1 */}
                  <div id='info-panel-battle-moves-a' className="flex">
                    <div className="flex justify-center items-center mx-1 w-1/2">
                      <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center h-full">Move</p>
                      <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                        {
                          teamState.team[teamState.focus].name ? teamState.team[teamState.focus].moves.map(move => <option className="rounded-md">{move.name}</option>) : null
                        }
                      </select>
                    </div>
                    {/* MOVE 2 */}
                    <div className="flex justify-center items-center mx-1 w-1/2">
                      <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center h-full">Move</p>
                      <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                        {
                          teamState.team[teamState.focus].name ? teamState.team[teamState.focus].moves.map(move => <option className="rounded-md">{move.name}</option>) : null
                        }
                      </select>
                    </div>
                  </div>

                  <div id='info-panel-battle-moves-b' className="flex">
                    {/* MOVE 3 */}
                    <div className="flex justify-center items-center mx-1 w-1/2">
                      <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center h-full">Move</p>
                      <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                        {
                          teamState.team[teamState.focus].name ? teamState.team[teamState.focus].moves.map(move => <option className="rounded-md">{move.name}</option>) : null
                        }
                      </select>
                    </div>
                    {/* MOVE 4 */}
                    <div className="flex justify-center items-center mx-1 w-1/2">
                      <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center h-full">Move</p>
                      <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                        {
                          teamState.team[teamState.focus].name ? teamState.team[teamState.focus].moves.map(move => <option className="rounded-md">{move.name}</option>) : null
                        }
                      </select>
                    </div>
                  </div>
                  {/* HELD ITEM AND ABILITIES */}
                  <div id='info-panel-battle-ability-and-item' className="flex">
                    {/* HELD ITEM */}
                    <div className="flex justify-center items-center mx-1 w-1/2">
                      <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center h-full">Item</p>
                      <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                        <option>TBA</option>
                      </select>
                    </div>
                    {/* ABILITIES */}
                    <div className="flex justify-center items-center mx-1 w-1/2">
                      <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center h-full">Abil</p>
                      <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                        {
                          teamState.team[teamState.focus].name ? teamState.team[teamState.focus].abilities.map(ability => <option className="rounded-md">{ability.name}</option>) : null
                        }
                      </select>
                    </div>
                  </div>
                </form>
                :
                bodyIdx === 1 ?
                  // EV & IV INFORMATION
                  <form id='info-panel-stats' onChange={(e) => handleUpdateStats(e)} className="w-full h-full">
                    <div key='info-panel-stat-values' className="w-full h-full flex text-black">
                      {/* PHYSICAL */}
                      <div id='info-panel-stat-physical' className="mx-1 flex flex-col justify-evenly">
                        {/* HP */}
                        <div className="flex justify-center items-center">
                          <p className="bg-blue-500 w-2/5 text-white rounded-l-md px-1 text-center">HP</p>
                          <input className="w-[30%] my-1 text-center border-r border-black/50" id='hpIv' placeholder="IV" value={teamState.team[teamState.focus].stats[0].iv || null} type="number" onChange={(e) => limitNumber(e, 2)}></input>
                          <input className="w-[30%] rounded-r-md my-1 text-center" id='hpEv' placeholder="EV" type="number" onChange={(e) => limitNumber(e, 3)} value={teamState.team[teamState.focus].stats[0].ev || null}></input>
                        </div>
                        {/* ATK */}
                        <div className="flex justify-center items-center">
                          <p className="bg-blue-500 w-2/5 text-white rounded-l-md px-1 text-center">ATK</p>
                          <input className="w-[30%] my-1 text-center border-r border-black/50" id='atkIv' placeholder="IV" value={teamState.team[teamState.focus].stats[1].iv || null} type="number" onChange={(e) => limitNumber(e, 2)}></input>
                          <input className="w-[30%] rounded-r-md my-1 text-center" id='atkEv' placeholder="EV" onChange={(e) => limitNumber(e, 3)} value={teamState.team[teamState.focus].stats[1].ev || null} type="number"></input>
                        </div>
                        {/* DEF */}
                        <div className="flex justify-center items-center">
                          <p className="bg-blue-500 w-2/5 text-white rounded-l-md px-1 text-center">DEF</p>
                          <input className="w-[30%] my-1 text-center border-r border-black/50" id='defIv' placeholder="IV" value={teamState.team[teamState.focus].stats[2].iv || null} type="number" onChange={(e) => limitNumber(e, 2)}></input>
                          <input className="w-[30%] rounded-r-md my-1 text-center" id='defEv' placeholder="EV" onChange={(e) => limitNumber(e, 3)} value={teamState.team[teamState.focus].stats[2].ev || null} type="number"></input>
                        </div>
                      </div>
                      {/* SPECIAL */}
                      <div id='info-panel-stat-special' className="mx-1 flex flex-col justify-evenly">
                        {/* SPEED */}
                        <div className="flex justify-center items-center">
                          <p className="bg-blue-500 w-2/5 text-white rounded-l-md px-1 text-center">SPD</p>
                          <input className="w-[30%] my-1 text-center border-r border-black/50" id='spdIv' placeholder="IV" value={teamState.team[teamState.focus].stats[5].iv || null} type="number" onChange={(e) => limitNumber(e, 2)}></input>
                          <input className="w-[30%] rounded-r-md my-1 text-center" id='spdEv' placeholder="EV" onChange={(e) => limitNumber(e, 3)} value={teamState.team[teamState.focus].stats[5].ev || null} type="number"></input>
                        </div>
                        {/* SPECIAL ATTACK */}
                        <div className="flex justify-center items-center">
                          <p className="bg-blue-500 w-2/5 text-white rounded-l-md px-1 text-center">SPATK</p>
                          <input className="w-[30%] my-1 text-center border-r border-black/50" id='spatkIv' placeholder="IV" value={teamState.team[teamState.focus].stats[3].iv || null} type="number" onChange={(e) => limitNumber(e, 2)}></input>
                          <input className="w-[30%] rounded-r-md my-1 text-center" id='spatkEv' placeholder="EV" onChange={(e) => limitNumber(e, 3)} value={teamState.team[teamState.focus].stats[3].ev || null} type="number"></input>
                        </div>
                        {/* SPECIAL DEFENSE */}
                        <div className="flex justify-center items-center">
                          <p className="bg-blue-500 w-2/5 text-white rounded-l-md px-1 text-center">SPDEF</p>
                          <input className="w-[30%] my-1 text-center border-r border-black/50" id='spdefIv' placeholder="IV" value={teamState.team[teamState.focus].stats[4].iv || null} type="number" onChange={(e) => limitNumber(e, 2)}></input>
                          <input className="w-[30%] rounded-r-md my-1 text-center" id='spdefEv' placeholder="EV" onChange={(e) => limitNumber(e, 3)} value={teamState.team[teamState.focus].stats[4].ev || null} type="number"></input>
                        </div>
                      </div>
                    </div>
                  </form>
                  :
                  <div className="flex flex-col w-full h-full">
                    <div className="flex justify-center min-h-0 w-full">
                      <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center">Nature</p>
                      <select className="w-2/3 h-fit text-center rounded-r-md text-black" onChange={(e) => handleUpdateNature(e.target.value)}>
                        {
                          natureModifiers.map(nature => <option className="rounded-md">{nature.name}</option>)
                        }
                      </select>
                    </div>
                    <div className="flex justify-evenly items-center text-center">
                    <div className="flex flex-col">
                      <p>
                        HP: {calculateStatTotal(teamState.team[teamState.focus].stats[0], teamState.team[teamState.focus].level, teamState.team[teamState.focus].nature)}
                      </p>
                      <p>
                        ATK: {calculateStatTotal(teamState.team[teamState.focus].stats[1], teamState.team[teamState.focus].level, teamState.team[teamState.focus].nature)}
                      </p>
                      <p>
                        DEF: {calculateStatTotal(teamState.team[teamState.focus].stats[2], teamState.team[teamState.focus].level, teamState.team[teamState.focus].nature)}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p>
                        SPD: {calculateStatTotal(teamState.team[teamState.focus].stats[5], teamState.team[teamState.focus].level, teamState.team[teamState.focus].nature)}
                      </p>
                      <p>
                        SPATK: {calculateStatTotal(teamState.team[teamState.focus].stats[3], teamState.team[teamState.focus].level, teamState.team[teamState.focus].nature)}
                      </p>
                      <p>
                        SPDEF: {calculateStatTotal(teamState.team[teamState.focus].stats[4], teamState.team[teamState.focus].level, teamState.team[teamState.focus].nature)}
                      </p>
                    </div>
                    </div>


                  </div>
            }
          </div>
          <div key='info-panel-body-right-arrow' onClick={() => handleArrowClick(1)} >
            <MT.Button className="h-full p-2">{`>`}</MT.Button>
          </div>
        </div>
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