import React, { useState } from "react";

import MT from "@/app/lib/clientmaterialtailwind";
import { IconButton } from "@material-tailwind/react"
import teamSlice from "@/app/reduxStore/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import { capitalizeWord, limitNumber } from "@/app/lib/helpers";
import TypeBadge from "../../accessory/TypeBadge";
import InfoPanel from "./infoPanel/InfoPanel";

function TeamSlot(props) {

  const [editForm, setEditForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const teamState = useSelector(state => state.team)
  const pokeState = useSelector(state => state.pokemon)
  const dispatch = useDispatch();
  const { addToTeam, setFocus } = teamSlice.actions;

  return (
    <>
      <MT.Card id={`team-slot-${props.position}`} className={`m-1 lg:m-1 lg:w-full lg:h-full rounded-md bg-black/50 min-h-0 ${teamState.focus == props.position ? 'border' : null}`}>
        <MT.CardBody
          className="p-0 items-center h-full w-auto text-white"
          onClick={() => dispatch(setFocus(props.position))}
        >
          {
            !teamState.team[props.position].name ?
              // no team member in slot
              <div className="flex justify-center items-center h-full">
                <div
                  className="bg-red-500 h-[90%] w-1/2 rounded-md mx-1 flex flex-col justify-center items-center relative"
                  onClick={() => pokeState.pokemon ? dispatch(addToTeam({ pokemon: pokeState.pokemon, position: props.position })) : null}
                >
                  <img src={pokeState.pokemon.sprite.front_default} className="max-h-full object-cover" />
                  <p className="absolute bottom-0">Add</p>
                </div>
                <div className="bg-blue-500 h-[90%] w-1/2 rounded-md mx-1 flex items-center justify-center">
                  <div className="fa-solid fa-magnifying-glass fa-2xl" />
                </div>
              </div>
              :
              // team member in slot
              <div className="h-full flex flex-col">

                <div id={`team-slot-${props.position}-header`} className="flex justify-between items-center w-full px-2 bg-pkRed rounded-t-md">
                  <p>{teamState.team[props.position].nickname || capitalizeWord(teamState.team[props.position].name)}</p>
                  <div className="flex justify-between space-x-2">
                    {
                      teamState.team[props.position]?.types?.map(el => <TypeBadge type={el.type.name} size={5} />)
                    }
                  </div>
                </div>
                  <img src={teamState.team[props.position].sprite.front_default} className="min-h-0 object-contain w-fit" />
              </div>
          }

          {/* {
            <div className="flex justify-between h-fit">
              <div>
                <p>{teamState.team[props.position].nickname || capitalizeWord(teamState.team[props.position].name)}</p>
              </div>

              <div>
                {
                  teamState.team[props.position].name ?
                    <div key={`team-slot-${props.position}`} className="flex flex-col h-full">

                      <div key={`team-slot-${props.position}-header`} className="w-full h-1/5 flex items-center justify-between">

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
                        <div className="flex justify-evenly items-center w-2/3 md:hidden">
                          <MT.Button size="sm" color="blue" className="max-w-1/3" onClick={() => props.handleDialog()}>Edit</MT.Button>
                          <MT.Button size='sm' color="red" className="max-w-1/3">Remove</MT.Button>
                        </div>
                      </div>

                    </div>
                    :
                    <div key='team-slot-placeholder' className="flex w-full h-full justify-between">
                      {
                        pokeState.pokemon ?
                          <div onClick={() => dispatch(addToTeam({ pokemon: pokeState.pokemon, position: props.position }))} className="w-1/2 h-full mr-1 bg-red-700 rounded-md hover:cursor-pointer hover:border flex flex-col justify-center items-center">
                            <img className="" src={pokeState.pokemon.sprite.front_default} />
                          </div>
                          :
                          null
                      }
                      <div className={`${pokeState.pokemon ? 'w-1/2' : 'w-full'} h-full ml-1 bg-blue-500 rounded-md hover:cursor-pointer hover:border flex justify-center items-center`}>
                        <p className="text-center">Search</p>
                      </div>
                    </div>
                }

              </div>
            </div>
          } */}
        </MT.CardBody>
      </MT.Card>
    </>

  )

}

export default TeamSlot;