import React from "react";

function MoveRowSort({css}) {

  return(
    <div className={'text-center align-middle py-2 px-0 flex items-center justify-center'}>
      <div className={`${css.row} ${css.numAndImg}`}><button className={css.button}>Level</button></div>
      <div className={`${css.row} ${css.str}`}><button className={css.button}>Name</button></div>
      <div className={`${css.row} ${css.numAndImg}`}><button className={css.button}>Power</button></div>
      <div className={`${css.row} ${css.numAndImg}`}><button className={css.button}>Accuracy</button></div>
      <div className={`${css.row} ${css.numAndImg}`}><button className={css.button}>PP</button></div>
      <div className={`${css.row} ${css.numAndImg}`}><button className={css.button}>Damage</button></div>
      <div className={`${css.row} ${css.numAndImg}`}><button className={css.button}>Type</button></div>
    </div>
  )

}

export default MoveRowSort;