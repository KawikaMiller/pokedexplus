import React from "react";

function MoveRowSort({ css, sortMoves, sortMovesBy, isAscending }) {

  return (
    <div className={css.row}>
      <div className={`${css.numAndImg}`} onClick={(e) => {
        sortMoves('levelLearned');
      }}>
        <button className={css.button + ` ${sortMovesBy === 'levelLearned' ? 'bg-red-500' : null}`}>
          {
            sortMovesBy === 'levelLearned' ?
              isAscending ?
                'Lvl⬘'
                :
                'Lvl⬙'
              :
              'Lvl◆'
          }
        </button>
      </div>
      <div className={`${css.str}`} onClick={() => sortMoves('name')}>
        <button className={css.button + ` ${sortMovesBy === 'name' ? 'bg-red-500' : null}`}>
          {
            sortMovesBy === 'name' ?
              isAscending ?
                'Name⬘'
                :
                'Name⬙'
              :
              'Name◆'
          }
        </button>
      </div>
      <div className={`${css.numAndImg} `} onClick={() => sortMoves('power')}>
        <button className={css.button + ` ${sortMovesBy === 'power' ? 'bg-red-500' : null}`}>
          {
            sortMovesBy === 'power' ?
              isAscending ?
                'Pow⬘'
                :
                'Pow⬙'
              :
              'Pow◆'
          }
        </button>
      </div>
      <div className={`${css.numAndImg}  hidden sm:block`} onClick={() => sortMoves('accuracy')}>
        <button className={css.button + ` ${sortMovesBy === 'accuracy' ? 'bg-red-500' : null}`}>
          {
            sortMovesBy === 'accuracy' ?
              isAscending ?
                'Acc⬘'
                :
                'Acc⬙'
              :
              'Acc◆'
          }
        </button>
      </div>
      <div className={`${css.numAndImg} hidden sm:block`} onClick={() => sortMoves('pp')}>
        <button className={css.button + ` ${sortMovesBy === 'pp' ? 'bg-red-500' : null}`}>
          {
            sortMovesBy === 'pp' ?
              isAscending ?
                'PP⬘'
              :
                'PP⬙'
            :
              'PP◆'
          }
        </button>
      </div>
      <div className={`${css.numAndImg}`} onClick={() => sortMoves('dmgClass')}>
        <button className={css.button + ` ${sortMovesBy === 'dmgClass' ? 'bg-red-500' : null}`}>
          {
            sortMovesBy === 'dmgClass' ?
              isAscending ?
                'Dmg⬘'
                :
                'Dmg⬙'
              :
              'Dmg◆'
          }
        </button>
      </div>
      <div className={`${css.numAndImg}`} onClick={() => sortMoves('type')}>
        <button className={css.button + ` ${sortMovesBy === 'type' ? 'bg-red-500' : null}`}>
          {
            sortMovesBy === 'type' ?
              isAscending ?
                'Type⬘'
                :
                'Type⬙'
              :
              'Type◆'
          }
        </button>
      </div>
    </div>
  )

}

export default MoveRowSort;