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
    <>
      <h4 className="text-lg">Abilities</h4>
      <div id='pokemon-abilities' className="flex justify-around bg-transparent/50">
        {
          pokeState.pokemon?.abilities.map(ability => <p onClick={() => {handleClick(ability)}}>{capitalizeWord(removeHyphen(ability.name))}</p>)
        }
      </div>

      <MT.Dialog open={isOpen} handler={() => setIsOpen(false)} className={modalStyle.container}>
        <MT.DialogHeader className={modalStyle.header}>{selectedAbility?.name}</MT.DialogHeader>
        <MT.DialogBody className={modalStyle.body}>{selectedAbility.description}</MT.DialogBody>
        <MT.DialogFooter className={modalStyle.footer}>
          <MT.Button size='sm' variant="filled" color="red" className="text-white" onClick={() => setIsOpen(false)}>X</MT.Button>
        </MT.DialogFooter>
      </MT.Dialog>
    </>
  )
}

export default Abilities;