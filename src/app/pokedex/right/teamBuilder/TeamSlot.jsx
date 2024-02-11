import React from "react";

import MT from "@/app/lib/clientmaterialtailwind";
import teamSlice from "@/app/reduxStore/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import { capitalizeWord } from "@/app/lib/helpers";
import TypeBadge from "../../accessory/TypeBadge";

function TeamSlot(props) {

  const teamState = useSelector(state => state.team)
  const pokeState = useSelector(state => state.pokemon)
  const dispatch = useDispatch();
  const { addToTeam, setFocus } = teamSlice.actions;

  return (
    <>
      <MT.Card className={`m-1 lg:m-1 lg:w-full lg:h-[32%] bg-black/50 min-h-0 ${teamState.focus == props.position ? 'border' : null}`}>
        <MT.CardBody 
          className="p-2 items-center h-full w-auto text-white"
          onClick={() => dispatch(setFocus(props.position))}
        >
          {
            teamState.team[props.position].name ?
              <div key={`team-slot-${props.position}`} className="flex flex-col h-full">

                <div key={`team-slot-${props.position}-header`} className="w-full h-1/5 flex items-center justify-between">
                  <p>
                    <span className="font-bold">Lv. {teamState.team[props.position].level} </span>
                    {capitalizeWord(teamState.team[props.position].name)}
                  </p>

                  <div className="flex justify-between w-14">
                    {
                      teamState.team[props.position].types.map(el => <TypeBadge type={el.type.name} size={5} />)
                    }
                  </div>
                </div>

                <div key={`team-slot-${props.position}-body`} className="w-full flex grow min-h-0">
                  <div className="flex flex-col justify-center items-center mr-1 min-h-0 w-auto grow">
                    <img className="rounded-[50%] max-h-full" src={teamState.team[props.position].sprite.front_default} />
                  </div>
                  <div className="flex justify-evenly items-center w-2/3">
                  <MT.Button size="sm" color="blue" className="max-w-1/3">Edit</MT.Button>
                  <MT.Button size='sm' color="red" className="max-w-1/3">Remove</MT.Button>
                  </div>
                </div>

              </div>
              :
              <div key='team-slot-placeholder' className="flex w-full h-full justify-between">
                {
                  pokeState.pokemon ?
                    <div onClick={() => dispatch(addToTeam({ pokemon: pokeState.pokemon, position: props.position }))} className="w-1/2 h-full mr-1 bg-red-700 rounded-md hover:cursor-pointer hover:border flex flex-col justify-center items-center">
                      {/* <p>Add {capitalizeWord(pokeState.pokemon.name)}</p> */}
                      <img className="" src={pokeState.pokemon.sprite.front_default} />
                    </div>
                    :
                    null
                }
                <div onClick={() => props.handleDialog()} className={`${pokeState.pokemon ? 'w-1/2' : 'w-full'} h-full ml-1 bg-blue-500 rounded-md hover:cursor-pointer hover:border flex justify-center items-center`}>
                  <p className="text-center">Search</p>
                </div>
              </div>

          }
        </MT.CardBody>
      </MT.Card>
    </>

  )

}

export default TeamSlot;