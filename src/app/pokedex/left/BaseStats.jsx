import React from "react";

import { useDispatch, useSelector } from "react-redux";

function BaseStats() {

  const pokeState = useSelector(state => state.pokemon);
  const statNames = ['HP', 'ATK', 'DEF', 'SPATK', 'SPDEF', 'SPD']

  return (
    <div id='pokemon-base-stats-container' className="">
      <h4 className="text-lg">Base Stats</h4>
      <div id='pokemon-base-stats' className="bg-transparent/50 flex flex-col justify-evenly" >
        {

          pokeState.pokemon?.stats ?

            pokeState.pokemon?.stats.map((stat, idx) => (
              <>
                <section className="flex justify-center items-center">
                  <h4 className="w-1/3 lg:w-1/3 text-center">{stat.name}</h4>
                  <p className="text-center bg-transparent/25 w-2/3">{stat.base_stat}</p>
                </section>
                {
                  idx !== 5 ? <hr className="w-full"></hr> : null
                }
              </>
            ))

            :

            <>
              {
                statNames.map((stat, idx) => (
                  <>
                    <section className="flex justify-center items-center">
                      <h4 className="w-1/3 lg:w-1/3 text-center">{`${stat}`}</h4>
                      <p className="text-center bg-transparent/25 w-2/3">---</p>
                    </section>
                    {
                      idx !== 5 ? <hr className="w-full"></hr> : null
                    }
                  </>
                ))
              }
            </>
        }
      </div>
    </div>

  )

}

export default BaseStats;