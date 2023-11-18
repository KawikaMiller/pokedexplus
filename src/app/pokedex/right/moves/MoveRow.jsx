import React from "react";

function MoveRow ({css}) {

  // onClick -> show modal w/ detailed information

  return(
    <div className={`${css.row} bg-black/50 mx-[0.125rem]`}>
      <div className={`${css.numAndImg}`}>999</div>
      <div className={css.str}>Menacing Moonraze Maelstrom</div>
      <div className={`${css.numAndImg}`}>999</div>
      <div className={`${css.numAndImg}`}>100</div>
      <div className={`${css.numAndImg}`}>45</div>
      <div className={`${css.numAndImg}`}>Dmg</div>
      <div className={`${css.numAndImg}`}>Type</div>
    </div>
  )

}

export default MoveRow;