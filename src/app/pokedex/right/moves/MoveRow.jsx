import React, { useState } from "react";
import { capitalizeWord, removeHyphen } from "@/app/lib/helpers";
import DamageBadge from "../../accessory/DamageBadge";

import { useDispatch, useSelector } from "react-redux";
import pokeSlice from "@/app/reduxStore/pokeSlice";
import TypeBadge from "../../accessory/TypeBadge";

function MoveRow ({css, move, alt, movesKey, handleClick}) {

  // const [move, moveDetails] = (getActiveVersionDetails(activeVersion));

  const getActiveVersionDetails = (activeVersion) => {
    move.versionDetails.find(vDetails => vDetails.version === activeVersion)
  }

  return(
    <div className={`${css.row} ${alt} hover:bg-green-400`} onClick={handleClick}>
      <div className={`${css.numAndImg}`}>{
        movesKey === 'levelLearned' ?
        // getActiveVersionDetails(activeVersion)
        move.levelLearned
        : 
        '--'
      }</div>
      <div className={css.str}>{capitalizeWord(removeHyphen(move.name))}</div>
      <div className={`${css.numAndImg} `}>{move.power || `--`}</div>
      <div className={`${css.numAndImg}  hidden sm:block`}>{move.accuracy || `--`}</div>
      <div className={`${css.numAndImg}  hidden sm:block`}>{move.pp}</div>
      <div className={`${css.numAndImg} flex justify-center`}>{<DamageBadge dmgClass={move.dmgClass} /> }</div>
      <div className={`${css.numAndImg} flex justify-center`}>{<TypeBadge type={move.type} />}</div>
    </div>
  )

}

export default MoveRow;