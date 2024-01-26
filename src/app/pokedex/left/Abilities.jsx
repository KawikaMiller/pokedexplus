import React, { useState } from "react";
import MT from "@/app/lib/clientmaterialtailwind";
import { modalStyle } from "../styles/tailwindClasses";

import { capitalizeWord, removeHyphen } from "@/app/lib/helpers";

import { useSelector } from "react-redux";


function Abilities(){
  const [selectedAbility, setSelectedAbility] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const pokeState = useSelector(state => state.pokemon);

  const handleClick = (ability) => {
    setIsOpen(true);
    setSelectedAbility(ability)
  }

  return(
    <div id='pokemon-abilities-container' className="m-2">
      <h4 className="text-lg">Abilities</h4>
      <div id='pokemon-abilities' className="flex justify-around bg-transparent/50">
        {
          pokeState.pokemon?.abilities ? 
          pokeState.pokemon.abilities.map(ability => <p onClick={() => {handleClick(ability)}}>{capitalizeWord(removeHyphen(ability.name))}</p>)
          :
          <p>--</p>
        }
      </div>

      {/* <MT.Dialog open={isOpen} handler={() => setIsOpen(false)} className={modalStyle.container}>
        {console.log(selectedAbility)}
        <MT.DialogHeader className={modalStyle.header}>
          {capitalizeWord(selectedAbility?.name || '--')}
          <p className={(!selectedAbility?.is_hidden ? 'hidden' : null) + ' text-sm'}>Hidden Ability</p>
        </MT.DialogHeader>
        <MT.DialogBody className={modalStyle.body}>{selectedAbility?.description || '--'}</MT.DialogBody>
        <MT.DialogFooter className={modalStyle.footer}>
          <MT.Button size='sm' variant="filled" color="red" className="text-white" onClick={() => setIsOpen(false)}>X</MT.Button>
        </MT.DialogFooter>
      </MT.Dialog> */}
    </div>
  )
}

export default Abilities;