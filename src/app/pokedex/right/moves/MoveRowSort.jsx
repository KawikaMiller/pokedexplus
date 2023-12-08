import React from "react";

function MoveRowSort({css, sortMoves}) {

  return(
    <div className={'text-center align-middle py-2 px-0 flex items-center justify-center'}>
      <div className={`${css.row} ${css.numAndImg}`} onClick={() => sortMoves('levelLearned')}>
        <button className={css.button}>
          {/* <p className="sm:block md:hidden">Lvl</p>
          <p className="hidden md:block">Level</p> */}
          Lvl
        </button>
      </div>
      <div className={`${css.row} ${css.str}`} onClick={() => sortMoves('name')}>
        <button className={css.button}>
          Name
        </button>
      </div>
      <div className={`${css.row} ${css.numAndImg}`} onClick={() => sortMoves('power')}>
        <button className={css.button}>
          {/* <p className="sm:block md:hidden">Pow</p>
          <p className="hidden md:block">Power</p> */}
          Pow
        </button>
      </div>
      <div className={`${css.row} ${css.numAndImg}`} onClick={() => sortMoves('accuracy')}>
        <button className={css.button}>
          {/* <p className="sm:block md:hidden">Acc</p>
          <p className="hidden md:block">Accuracy</p> */}
          Acc
        </button>
      </div>
      <div className={`${css.row} ${css.numAndImg}`} onClick={() => sortMoves('pp')}>
        <button className={css.button}>
          PP
        </button>
      </div>
      <div className={`${css.row} ${css.numAndImg}`} onClick={() => sortMoves('dmgClass')}>
        <button className={css.button}>
          {/* <p className="sm:block md:hidden">Dmg</p>
          <p className="hidden md:block">Lamage</p> */}
          Dmg
        </button>
      </div>
      <div className={`${css.row} ${css.numAndImg}`} onClick={() => sortMoves('type')}>
        <button className={css.button}>
          Type
        </button>
      </div>
    </div>
  )

}

export default MoveRowSort;