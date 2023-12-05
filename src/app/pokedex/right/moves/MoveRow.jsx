import React from "react";
import { capitalizeWord, removeHyphen } from "@/app/lib/helpers";
import DamageBadge from "../../accessory/DamageBadge";

import { useDispatch, useSelector } from "react-redux";
import pokeSlice from "@/app/reduxStore/pokeSlice";
import TypeBadge from "../../accessory/TypeBadge";

function MoveRow ({css, move, alt}) {

  // onClick -> show modal w/ detailed information

  return(
    <div className={`${css.row} ${alt}  mx-[0.125rem] hover:bg-green-400`}>
      <div className={`${css.numAndImg}`}>{move.versionDetails[0].levelLearned}</div>
      <div className={css.str}>{capitalizeWord(removeHyphen(move.name))}</div>
      <div className={`${css.numAndImg}`}>{move.power || `-`}</div>
      <div className={`${css.numAndImg}`}>{move.accuracy || `-`}</div>
      <div className={`${css.numAndImg}`}>{move.pp}</div>
      <div className={`${css.numAndImg} flex justify-center`}>{<DamageBadge dmgClass={move.dmgClass} /> }</div>
      <div className={`${css.numAndImg} flex justify-center`}>{<TypeBadge type={move.type} />}</div>
    </div>
  )

}

export default MoveRow;