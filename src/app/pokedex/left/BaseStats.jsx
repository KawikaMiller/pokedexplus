import React from "react";

import { useDispatch, useSelector } from "react-redux";

function BaseStats() {

  const pokeState = useSelector(state => state.pokemon);
  const statNames = ['HP', 'ATK', 'DEF', 'SPATK', 'SPDEF', 'SPD']

  return (
    <div id='pokemon-base-stats-container' >
      <div id='pokemon-base-stats' className="bg-transparent/50 flex flex-col justify-between h-full" >
        {
          statNames.map((stat, idx) => (
            <>
              <section className="flex justify-center items-center">
                <b className="bg-blue-500 w-2/3 lg:w-1/3 text-center">{`${stat}`}</b>
                <p className="text-center bg-transparent/25 w-1/3">
                  {
                    pokeState.pokemon?.stats ?
                      pokeState.pokemon.stats[idx].base_stat
                      :
                      '000'
                  }
                </p>
              </section>
              {
                idx !== 5 ? <hr className="w-full"></hr> : null
              }
            </>
          ))
        }
      </div>
    </div>
  )

}

export default BaseStats;