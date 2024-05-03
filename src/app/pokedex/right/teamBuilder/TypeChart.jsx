import React, { useState } from "react";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import { useDispatch, useSelector } from "react-redux";
import TypeBadge from "../../accessory/TypeBadge";

import { types, determineTypeEffectiveness, capitalizeWord, removeHyphen } from "@/app/lib/helpers";

function SmTypeChartRow(props) {

  let typeEffectiveness = determineTypeEffectiveness(props.typeObj)

  return (
    <tr key={`${props.pokemon}_typechart_row`} className="odd:bg-black/20 even:bg-black/25 flex w-full">
      {/* <td key={`${props.pokemon}_label`} className="flex justify-center items-center p-1 flex-grow">
        <img src={props.sprite} className="" />
      </td> */}
      <div className="grid grid-cols-6 grid-rows-3 justify-items-stretch w-full">
        {
          typeEffectiveness ?
            typeEffectiveness.map((element, idx) => (
              <div className={`border border-white flex-col items-center flex bg-${types[idx]}`}>
                <td><TypeBadge type={types[idx]} size={6} /></td>
                <td
                  className={`${element.effectiveness < 1 ? 'bg-red-500' : element.effectiveness > 1 ? 'bg-green-500' : `bg-blue-500`} border-t w-full`}
                >
                  {`x${element.effectiveness == '0.5' ? '1⁄2' : element.effectiveness == '0.25' ? '1⁄4' : element.effectiveness}`}
                </td>
              </div>
            ))
            :
            null
        }
      </div>
    </tr>
  )

}

// ----------------------------------------------------------------------------------------

function LgTypeChartRow(props) {

  let typeEffectiveness = determineTypeEffectiveness(props.typeObj)

  return (
    <tr key={`${props.pokemon}_typechart_row`} className="odd:bg-blue-500/75 even:bg-red-500/75 border-white border flex w-full">
      <td key={`${props.pokemon}_label`} className="flex justify-center p-1 flex-grow">
        <strong>
          {capitalizeWord(removeHyphen(props.pokemon))}
        </strong>
        {/* <img src={props.pokemon} className="h-3/4 w-3/4" /> */}
      </td>
      {
        typeEffectiveness ?
          typeEffectiveness.map(element => (
            <td
              className={`${element.effectiveness < 1 ? 'bg-red-500' : element.effectiveness > 1 ? 'bg-green-500' : null} border-white border`}
            >
              {`x${element.effectiveness == '0.5' ? '1⁄2' : element.effectiveness == '0.25' ? '1⁄4' : element.effectiveness}`}
            </td>
          ))
          :
          null
      }
    </tr>
  )
}

// ----------------------------------------------------------------------------------------

function TeamTypeChart() {

  const teamState = useSelector(state => state.team);
  const screenWidth = useScreenWidth();
  const [teamIdx, setTeamIdx] = useState(0);

  const handleTeamIdx = (val) => {
    let newIdx = teamIdx + val;

    while (!teamState.team[newIdx]?.name) {
      if (newIdx + val > 5) {
        newIdx = 0
      } else if (newIdx + val < 0) {
        newIdx = 5
      } else newIdx = newIdx + val
    }

    setTeamIdx(newIdx)
  }

  return (

    <>
      <table id='team-type-coverage-chart' className="w-full text-center text-white border-white border">

        {/* TABLE HEADER i.e. COLUMN LABELS */}
        <thead id='type-chart-tablehead' key='type-chart-tablehead' className="">
          <tr key='type-chart-headers' id='type-chart-headers' className="bg-blue-500 flex py-2">
            {
              screenWidth < 1280 ?
                <div className="flex justify-evenly w-full">
                  {
                    teamState.team.map((teamMember, idx) => (
                      <button onClick={() => setTeamIdx(idx) } className="w-10 rounded-full border overflow-hidden" disabled={!teamMember?.name ? true : false}>
                        {
                          <img className={`bg-white/20 rounded-full`} src={teamMember.sprite?.front_default || null}/>
                        }
                      </button>
                    ))
                  }
                </div>
                :
                <>
                  <th className="border-white border flex-grow"></th>{/*intentionally blank*/}
                  <div className="grid grid-cols-6 grid-rows-3">
                    {types.map(element => (
                      <th key={`${element}_header`} className="border border-white p-1">
                        <div className="flex justify-center">
                          <TypeBadge type={element} size={6} />
                        </div>
                      </th>
                    ))}
                  </div>
                </>
            }
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody id='type-chart-tablebody' key='type-chart-tablebody' className="odd:text-red-500">
          {
            screenWidth < 1280 ?
              <div className="flex relative">
                {/* <button className="bg-blue-500 p-2 font-bold rounded-full absolute" onClick={() => handleTeamIdx(-1)}>{`<`}</button> */}
                <SmTypeChartRow typeObj={teamState.team[teamIdx].types || null} pokemon={teamState.team[teamIdx].name} sprite={teamState.team[teamIdx].sprite.front_default} />
                {/* <button className="bg-blue-500 p-1 font-bold rounded-full absolute -right-4 top-0 bottom-0 m-auto" onClick={() => handleTeamIdx(1)}>{`>`}</button> */}
              </div>
              :
              teamState.team.map(pokemon => (
                pokemon.name ?
                  <LgTypeChartRow typeObj={pokemon.types || null} pokemon={pokemon.name} />
                  :
                  null
              ))
          }
        </tbody>

      </table>
    </>

  )

}

export default TeamTypeChart