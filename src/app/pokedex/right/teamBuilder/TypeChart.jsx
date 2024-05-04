import React, { useState, useEffect } from "react";
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

  const temp = `${props.typeObj.length > 1 ? `bg-gradient-to-r from-${props.typeObj[0].type.name} to-${props.typeObj[1].type.name}` : `bg-${props.typeObj[0].type.name}`}`

  return (
    <tr key={`${props.pokemon}_typechart_row`} className={`border-white border even:bg-black/40 odd:bg-black/10`}>
      <td key={`${props.pokemon}_label`} className={``}>
        <strong className="capitalize font-bold">
          {removeHyphen(props.pokemon)}
        </strong>
      </td>
      {
        typeEffectiveness ?
          typeEffectiveness.map(element => (
            <td
              className={`${element.effectiveness < 1 ? 'bg-red-500' : element.effectiveness > 1 ? 'bg-green-500' : ''} border p-1`}
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

  const handleClick = (e, newIdx) => {

    let els = document.getElementsByClassName('test');

    els[teamIdx].classList.contains('!border-red-500')
    els[teamIdx].classList.remove('!border-red-500');
    els[newIdx].classList.add('!border-red-500')

    setTeamIdx(newIdx)
  }

  useEffect(() => {
    if (screenWidth < 1280) {
      if (!teamState.team[teamIdx].name) {
        const targetPkmn = teamState.team.findIndex(pkmn => pkmn.name)
        setTeamIdx(targetPkmn)
        let els = document.getElementsByClassName('test');
        els[targetPkmn].classList.add('!border-red-500')
      } else {
        let els = document.getElementsByClassName('test');
        els[teamIdx].classList.add('!border-red-500')
      }
    }
  }, [])

  return (

    <>
      <table id='team-type-coverage-chart' className="w-full min-w-max text-center text-white border-white border">

        {/* TABLE HEADER i.e. COLUMN LABELS */}
        <thead id='type-chart-tablehead' key='type-chart-tablehead' className="">
          <tr key='type-chart-headers' id='type-chart-headers' className="bg-blue-500 py-2 xl:py-0">
            {
              screenWidth < 1280 ?
                <div className="flex justify-evenly w-full bg-blue-500">
                  {
                    teamState.team.map((teamMember, idx) => (
                      <button onClick={(e) => handleClick(e, idx)} className="w-10 rounded-full border-2 overflow-hidden test" disabled={!teamMember?.name ? true : false}>
                        {
                          <img className={`bg-white/40 rounded-full`} src={teamMember.sprite?.front_default || null} />
                        }
                      </button>
                    ))
                  }
                </div>
                :
                <>
                  <th className="border border-r-0"></th>{/*intentionally blank*/}
                  {types.map(element => (
                    <th key={`${element}_header`} className="border p-1">
                      <div className="flex justify-center">
                        <TypeBadge type={element} />
                      </div>
                    </th>
                  ))}
                </>
            }
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody id='type-chart-tablebody' key='type-chart-tablebody' className="">
          {
            screenWidth < 1280 ?
              <div className="">
                <p className="capitalize font-bold bg-black/50">{teamState.team[teamIdx].nickname || teamState.team[teamIdx].name}</p>
                <SmTypeChartRow typeObj={teamState.team[teamIdx].types || null} pokemon={teamState.team[teamIdx].name} sprite={teamState.team[teamIdx].sprite.front_default} />
              </div>
              :
              teamState.team.map((pokemon, idx) => (
                pokemon.name ?
                  <LgTypeChartRow typeObj={pokemon.types || null} pokemon={pokemon.name} sprite={teamState.team[idx].sprite.front_default}/>
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