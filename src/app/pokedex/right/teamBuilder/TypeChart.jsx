import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TypeBadge from "../../accessory/TypeBadge";

import { types, determineTypeEffectiveness, capitalizeWord, removeHyphen } from "@/app/lib/helpers";

function TypeChartRow(props) {

  let typeEffectiveness = determineTypeEffectiveness(props.typeObj)

  return(
    <tr key={`${props.pokemon}_typechart_row`} className="odd:bg-black/25 even:bg-black/50 border-white border">
      <td key={`${props.pokemon}_label`} className="flex justify-center p-1">
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

function TeamTypeChart() {

  const teamState = useSelector(state => state.team)

  return (

    <>
      <table id='team-type-coverage-chart' className="w-full min-w-max text-center text-white border-white border">

        {/* TABLE HEADER i.e. COLUMN LABELS */}
        <thead id='type-chart-tablehead' key='type-chart-tablehead' className="">
          <tr key='type-chart-headers' id='type-chart-headers' className="bg-blue-500">
          <th className="border-white border"></th>{/*intentionally blank*/}
              {types.map(element => (
                <th key={`${element}_header`} className="border border-white p-1">
                  <div className="flex justify-center">
                    <TypeBadge type={element} size={6}/>
                  </div>
                </th>
              ))}
          </tr>
        </thead>
        
        {/* TABLE BODY */}
        <tbody id='type-chart-tablebody' key='type-chart-tablebody' className="odd:text-red-500">
              {
                teamState.team.map(pokemon => (
                  pokemon.name ?
                  <TypeChartRow typeObj={pokemon.types || null} pokemon={pokemon.name}/>
                  :
                  <tr></tr>
                ))
              }
        </tbody>

      </table>
    </>

  )

}

export default TeamTypeChart