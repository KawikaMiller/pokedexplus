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
  const { addToTeam, setFocus, removeFromTeam } = teamSlice.actions;

  return (
    <MT.Card id={`team-slot-${props.position}`} className={`m-1 lg:m-1 lg:w-full lg:h-full rounded-md bg-black/50 min-h-0 border ${teamState.focus == props.position ? 'border-green-500' : null}`}>
      <MT.CardBody
        className="p-0 items-center h-full w-auto text-white"
        onClick={() => dispatch(setFocus(props.position))}
      >
        {
          !teamState.team[props.position]?.name ?
            // no team member in slot
            <div className="flex justify-center items-center h-full">
              <div
                className="bg-red-500 h-[90%] w-1/2 rounded-md mx-1 flex flex-col justify-center items-center relative"
                onClick={() => pokeState.pokemon ? dispatch(addToTeam({ pokemon: pokeState.pokemon, position: props.position })) : null}
              >
                <img src={pokeState.pokemon?.sprite.front_default || `https://placehold.co/100x100/?text=.`} className="max-h-full object-cover" />
                <p className="absolute bottom-0">Add</p>
              </div>
              <div className="bg-blue-500 h-[90%] w-1/2 rounded-md mx-1 flex items-center justify-center">
                <div className="fa-solid fa-magnifying-glass fa-2xl" />
              </div>
            </div>
            :
            // team member in slot
            <div className={`h-full flex rounded-md bg-gradient-to-tr from-${teamState.team[props.position].types[0].type.name} to-${teamState.team[props.position].types.length > 1 ? teamState.team[props.position].types[1].type.name : teamState.team[props.position].types[0].type.name}`}>
              <div className="flex justify-between items-center min-h-0 h-full max-h-full">
                {/* pokemon sprite */}
                <div className={`h-full flex justify-center items-center rounded-l-md p-1.5`}>
                  <img src={teamState.team[props.position].sprite.front_default} className="max-h-full border bg-white/50 rounded-full" />
                </div>
              </div>

              <div className={`flex flex-col justify-between flex-grow p-1 rounded-r-md bg-black/20`}>
                
                <div id={`team-slot-${props.position}-header`} className={`flex justify-between items-center p-1 rounded-t-md border-b`}>
                  <b>{teamState.team[props.position].nickname || capitalizeWord(teamState.team[props.position].name)}</b>
                  <div className="flex justify-between space-x-2">
                    {
                      teamState.team[props.position]?.types?.map(el => <TypeBadge type={el.type.name} size={6} />)
                    }
                  </div>
                </div>

                <div className="flex justify-between md:justify-end px-1 space-x-4 items-center flex-grow">
                  <MT.Button size="sm" color="blue" className="max-w-1/3" onClick={() => props.handleDialog()}>Edit</MT.Button>
                  <MT.Button size='sm' color="red" className="max-w-1/3" onClick={() => dispatch(removeFromTeam(props.position))}>Remove</MT.Button>
                </div>
              </div>


            </div>
        }
      </MT.CardBody>
    </MT.Card>
  )

}

// 

export default TeamSlot;