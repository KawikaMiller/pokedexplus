import React, { useState } from "react";

import MT from "@/app/lib/clientmaterialtailwind";

import teamSlice from "@/app/reduxStore/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import { capitalizeWord } from "@/app/lib/helpers";
import TypeBadge from "../../accessory/TypeBadge";

function InfoPanel() {

  const teamState = useSelector(state => state.team);
  const dispatch = useDispatch();

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

  return (
    <div key='info-panel-container' className="w-full h-full">
      <div key='info-panel-header' className="flex justify-between p-0.5">
        <div key='info-panel-name'>
          {teamState.focusedMember.name ? capitalizeWord(teamState.focusedMember.name) : 'missingName'}
        </div>
        <div key='info-panel-types' className="flex justify-between w-16">
          {
            teamState.focusedMember.types ? teamState.focusedMember.types.map(el => <TypeBadge type={el.type.name} size={6}/>) : null
          }
        </div>
      </div>
      <div key='info-panel-body' className="flex justify-between">
        <div key='info-panel-body-left-arrow' onClick={() => handleArrowClick(-1)}>
          <MT.Button className="h-full p-3">{`<`}</MT.Button>
        </div>
        <div id="info-panel-body-info" key='info-panel-body-info' className="grow w-full px-2">
          {
            bodyIdx === 0 ?
              <div key='info-panel-battle' className="w-full flex">
                <div id='info-panel-battle-moves' className="flex flex-col">
                  <input className="w-full rounded-md my-1"></input>
                  <input className="w-full rounded-md my-1"></input>
                  <input className="w-full rounded-md my-1"></input>
                  <input className="w-full rounded-md my-1"></input>
                </div>
                <div id='info-panel-battle-ability-and-item' className="flex flex-col">
                  <input className="w-full rounded-md my-1"></input>
                  <input className="w-full rounded-md my-1"></input>
                </div>
              </div>
              :
              bodyIdx === 1 ?
                <>
                  <div key='info-panel-values' className="w-full flex text-black">
                    <div id='info-panel-physical' className="mx-1">
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
                    <div id='info-panel-special' className="mx-1">
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
                  <div className="flex justify-center min-h-0">
                    <p className="bg-blue-500 w-1/3 text-white rounded-l-md px-1 text-center">Nature</p>
                    <select className="w-1/3 h-fit text-center rounded-r-md text-black" value="Nature">
                      <option className="bg-red-400">Bashful</option>
                      <option className="bg-red-400">Bashful</option>
                      <option className="bg-red-400">Bashful</option>
                      
                    </select>
                  </div>
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