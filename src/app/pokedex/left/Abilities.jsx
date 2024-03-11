import React, { useState } from "react";
import MT from "@/app/lib/clientmaterialtailwind";
import { modalStyle } from "../styles/tailwindClasses";

import { capitalizeWord, removeHyphen } from "@/app/lib/helpers";

import { useSelector } from "react-redux";


function Abilities(){
  const [selectedAbility, setSelectedAbility] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const pokeState = useSelector(state => state.pokemon);

  const handleClick = (ability) => {
    setOpenDialog(true);
    setSelectedAbility(ability)
  }

  return(
    <div id='pokemon-abilities-container' className="">
      {/* <h4 className="text-lg">Abilities</h4> */}
      <div id='pokemon-abilities' className="flex flex-wrap justify-around bg-transparent/50 p-1">
        {
          pokeState.pokemon?.abilities ? 
          pokeState.pokemon.abilities.map(ability => (
            <p className="p-1 border hover:bg-green-300 rounded-md cursor-pointer" onClick={() => {handleClick(ability)}}>{capitalizeWord(removeHyphen(ability.name))}
              <span className="text-xs">{ability.is_hidden ? '(H)' : null}</span>
            </p>
          ))
          :
          <>
          <p>Long Name</p>
          <p>Long Name Ability</p>
          <p>Long Name Ability</p>
          <p>Long Name</p>
          </>
        }
      </div>

      <MT.Dialog open={openDialog} handler={() => setOpenDialog(false)} className={modalStyle.container}>
        <MT.DialogHeader className={modalStyle.header}>
          {capitalizeWord(selectedAbility?.name || '--')}
          <p className={'text-sm'}>
            {
              selectedAbility?.is_hidden ? 'Hidden Ability' : 'Ability'
            }
          </p>
        </MT.DialogHeader>
        <MT.DialogBody className={modalStyle.body}>{selectedAbility?.description || '--'}</MT.DialogBody>
        <MT.DialogFooter className={modalStyle.footer}>
          <MT.Button size='sm' variant="filled" color="red" className="text-white" onClick={() => setOpenDialog(false)}>X</MT.Button>
        </MT.DialogFooter>
      </MT.Dialog>
    </div>
  )
}

export default Abilities;