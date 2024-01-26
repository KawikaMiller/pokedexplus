import React from "react";

import { useDispatch, useSelector } from "react-redux";

function BaseStats() {

  const pokeState = useSelector(state => state.pokemon);

  return (
    <div id='pokemon-base-stats-container' className="m-2">
      <h4 className="text-lg">Base Stats</h4>
      <div id='pokemon-base-stats' className="bg-transparent/50 flex flex-col justify-evenly" >
        {

          pokeState.pokemon?.stats ?

            pokeState.pokemon?.stats.map(stat => (
              <section className="flex">
                <h4 className="w-4/5 sm:w-1/3 lg:w-1/3">{stat.name}</h4>
                <p className="text-center bg-transparent/25 w-2/3">{stat.base_stat}</p>
              </section>
            ))

            :

            <>
              <section className="flex">
                <h4 className="w-4/5 sm:w-1/3 lg:w-1/3">HP</h4>
                <p className="text-center bg-transparent/25 w-2/3">---</p>
              </section>
              <section className="flex">
                <h4 className="w-4/5 sm:w-1/3 lg:w-1/3">ATK</h4>
                <p className="text-center bg-transparent/25 w-2/3">---</p>
              </section>
              <section className="flex">
                <h4 className="w-4/5 sm:w-1/3 lg:w-1/3">DEF</h4>
                <p className="text-center bg-transparent/25 w-2/3">---</p>
              </section>
              <section className="flex">
                <h4 className="w-4/5 sm:w-1/3 lg:w-1/3">SPATK</h4>
                <p className="text-center bg-transparent/25 w-2/3">---</p>
              </section>
              <section className="flex">
                <h4 className="w-4/5 sm:w-1/3 lg:w-1/3">SPDEF</h4>
                <p className="text-center bg-transparent/25 w-2/3">---</p>
              </section>
              <section className="flex">
                <h4 className="w-4/5 sm:w-1/3 lg:w-1/3">SPD</h4>
                <p className="text-center bg-transparent/25 w-2/3">---</p>
              </section>
            </>
        }
      </div>
    </div>

  )

}

export default BaseStats;