import React, { useState } from "react";

import MT from "@/app/lib/clientmaterialtailwind";

import teamSlice from "@/app/reduxStore/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import { capitalizeWord } from "@/app/lib/helpers";
import TypeBadge from "../../accessory/TypeBadge";
import { natureModifiers } from "@/app/lib/helpers";

function InfoPanel() {

  const teamState = useSelector(state => state.team);
  const dispatch = useDispatch();
  const { setFocusedMember } = teamSlice.actions

  const [bodyIdx, setBodyIdx] = useState(0)

  const handleArrowClick = (value) => {
    let newIdx = bodyIdx + value;

    if (newIdx >= 2) {
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
        e.target.value > 31 ? e.target.value = 31 : null
    }
  }

  const updateNature = (nature) => {
    let temp = { ...teamState.focusedMember };
    temp.nature = nature;
    dispatch(setFocusedMember(temp))
  }

  const updateStat = (stats) => {
    let temp = { ...teamState.focusedMember };
    temp.stats = stats;
    dispatch(setFocusedMember(temp))
  }

  return (
    <div key='info-panel-container' className="w-full h-full bg-black/50">
      <div key='info-panel-header' className="flex justify-between p-0.5 h-1/4">
        <div key='info-panel-name'>
          {teamState.focusedMember.name ? capitalizeWord(teamState.focusedMember.name) : 'missingName'}
        </div>
        <div key='info-panel-types' className="flex justify-between w-16">
          {
            teamState.focusedMember.types ? teamState.focusedMember.types.map(el => <TypeBadge type={el.type.name} size={6} />) : null
          }
        </div>
      </div>
      <div id='info-panel-body' key='info-panel-body' className="flex justify-between h-3/4">
        <div key='info-panel-body-left-arrow' onClick={() => handleArrowClick(-1)}>
          <MT.Button className="h-full p-3">{`<`}</MT.Button>
        </div>
        <div id="info-panel-body-info" key='info-panel-body-info' className="grow flex flex-col justify-stretch items-stretch h-full w-full px-0.5">
          {
            bodyIdx === 0 ?
              <div key='info-panel-battle' className="w-full h-full flex flex-col justify-evenly">
                <div id='info-panel-battle-moves-a' className="flex">
                  <div className="flex justify-center items-center mx-1 w-1/2">
                    <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center h-full">Move</p>
                    <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                      {
                        teamState.focusedMember.moves.map(move => <option className="rounded-md">{move.name}</option>)
                      }
                    </select>
                  </div>

                  <div className="flex justify-center items-center mx-1 w-1/2">
                    <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center h-full">Move</p>
                    <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                      {
                        teamState.focusedMember.moves.map(move => <option className="rounded-md">{move.name}</option>)
                      }
                    </select>
                  </div>
                </div>

                <div id='info-panel-battle-moves-b' className="flex">
                  <div className="flex justify-center items-center mx-1 w-1/2">
                    <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center h-full">Move</p>
                    <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                      {
                        teamState.focusedMember.moves.map(move => <option className="rounded-md">{move.name}</option>)
                      }
                    </select>
                  </div>

                  <div className="flex justify-center items-center mx-1 w-1/2">
                    <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center h-full">Move</p>
                    <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                      {
                        teamState.focusedMember.moves.map(move => <option className="rounded-md">{move.name}</option>)
                      }
                    </select>
                  </div>
                </div>

                <div id='info-panel-battle-ability-and-item' className="flex">
                  <div className="flex justify-center items-center mx-1 w-1/2">
                    <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center">Item</p>
                    <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                      <option>TBA</option>
                    </select>
                  </div>

                  <div className="flex justify-center items-center mx-1 w-1/2">
                    <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center">Abil</p>
                    <select className="w-2/3 h-fit text-center rounded-r-md text-black">
                      {
                        teamState.focusedMember.abilities.map(ability => <option className="rounded-md">{ability.name}</option>)
                      }
                    </select>
                  </div>
                </div>
              </div>
              :
              bodyIdx === 1 ?
                <>
                  <div key='info-panel-values' className="w-full h-full flex">
                    <div id='info-panel-physical' className="mx-1 flex flex-col justify-evenly">
                      <div className="flex justify-center items-center">
                        <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center">HP</p>
                        <input className="w-1/3 my-1 text-center border-r border-black/50" placeholder="IV" type="number" onChange={(e) => limitNumber(e, 2)}></input>
                        <input className="w-1/3 rounded-r-md my-1 text-center" placeholder="EV" type="number" onChange={(e) => limitNumber(e, 3)}></input>
                      </div>
                      <div className="flex justify-center items-center">
                        <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center">ATK</p>
                        <input className="w-1/3 my-1 text-center border-r border-black/50" placeholder="IV" type="number"></input>
                        <input className="w-1/3 rounded-r-md my-1 text-center" placeholder="EV" type="number"></input>
                      </div>
                      <div className="flex justify-center items-center">
                        <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center">DEF</p>
                        <input className="w-1/3 my-1 text-center border-r border-black/50" placeholder="IV" type="number"></input>
                        <input className="w-1/3 rounded-r-md my-1 text-center" placeholder="EV" type="number"></input>
                      </div>
                    </div>
                    <div id='info-panel-special' className="mx-1 flex flex-col justify-evenly">
                      <div className="flex justify-center items-center">
                        <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center">SPD</p>
                        <input className="w-1/3 my-1 text-center border-r border-black/50" placeholder="IV" type="number"></input>
                        <input className="w-1/3 rounded-r-md my-1 text-center" placeholder="EV" type="number"></input>
                      </div>
                      <div className="flex justify-center items-center">
                        <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center">SPATK</p>
                        <input className="w-1/3 my-1 text-center border-r border-black/50" placeholder="IV" type="number"></input>
                        <input className="w-1/3 rounded-r-md my-1 text-center" placeholder="EV" type="number"></input>
                      </div>
                      <div className="flex justify-center items-center">
                        <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center">SPDEF</p>
                        <input className="w-1/3 my-1 text-center border-r border-black/50" placeholder="IV" type="number"></input>
                        <input className="w-1/3 rounded-r-md my-1 text-center" placeholder="EV" type="number"></input>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex justify-center min-h-0">
                    <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center">Nature</p>
                    <select className="w-1/3 h-fit text-center rounded-r-md text-black" onChange={(e) => updateNature(e.target.value)}>
                      {
                        natureModifiers.map(nature => <option className="rounded-md">{nature.name}</option>)
                      }
                    </select>
                  </div> */}
                </>
                :
                null
          }
        </div>
        <div key='info-panel-body-right-arrow' onClick={() => handleArrowClick(1)} >
          <MT.Button className="h-full p-3">{`>`}</MT.Button>
        </div>
      </div>
    </div>
  )

}

export default InfoPanel;