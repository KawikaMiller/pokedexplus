import React from "react";

import MT from "@/app/lib/clientmaterialtailwind";

import { capitalizeWord } from "@/app/lib/helpers";

import { useDispatch, useSelector } from "react-redux";
import pokeSlice from "@/app/reduxStore/pokeSlice";

function DetailedInfo() {

  const pokeState = useSelector(state => state.pokemon)

  return (
    <div id='detailed-info' className="bg-transparent/50 w-auto m-2 flex flex-wrap items-center p-1 justify-between md:w-1/3 md:flex-nowrap md:flex-col lg:text-md lg:full">

      <div id='bio-height-weight-gender' className="flex md:flex-col justify-around w-full sm:h-1/4 sm:justify-evenly">
        <div className="w-1/2 md:w-full flex justify-around">
          <section id='pokemon-bio-height' className="w-max md:w-full flex flex-col items-center">
            <h4 className="font-bold">Height</h4>
            <hr className="w-full md:w-5/6"></hr>
            <p>{pokeState?.pokemon?.height.m ? `${pokeState.pokemon.height.m}m` : `--`}</p>
          </section>

          <section id='pokemon-bio-weight' className="w-max md:w-full flex flex-col items-center">
            <h4 className="font-bold">Weight</h4>
            <hr className="w-full md:w-5/6"></hr>
            <p>{pokeState?.pokemon?.weight.kg ? `${pokeState.pokemon.weight.kg}kg` : `--`}</p>
          </section>
        </div>

        <section id='pokemon-bio-gender' className="w-1/2 md:w-full flex flex-col items-center">
          <h4 className="font-bold">Gender Ratio</h4>
          <hr className="w-5/6"></hr>
          <p className="text-[0.75rem]">
            {pokeState?.pokemon?.genderRate ? `${100 - (pokeState.pokemon?.genderRate / 8 * 100)} ♂ | ${pokeState.pokemon?.genderRate / 8 * 100}% ♀` : '--'}
          </p>
          <MT.Progress
            barProps={{ className: 'rounded-none' }}
            value={100 - pokeState?.pokemon?.genderRate / 8 * 100} 
            className={(pokeState?.pokemon?.genderRate ? `bg-pink-400` : `bg-white/30`) + ` mb-2 w-5/6`}
            color="blue" size="sm" />
        </section>
      </div>

      <div id='bio-breeding' className="flex md:flex-col justify-around w-full sm:h-1/4">
        <section id='pokemon-bio-egg' className="w-1/2 md:w-full flex flex-col items-center">
          <h4 className="font-bold">Egg Group</h4>
          <hr className="w-5/6"></hr>
          <div className="flex justify-between">
            {pokeState.pokemon?.eggGroups ? pokeState.pokemon.eggGroups.map((element, idx) => (
              <p className="whitespace-pre-wrap" >
                {
                  idx == 0 ?
                    `${capitalizeWord(element)}& `
                    :
                    `${capitalizeWord(element)}`
                }
              </p>
            )) : `--`}
          </div>
        </section>

        <section id='pokemon-bio-hatch' className="w-1/2 md:w-full flex flex-col items-center">
          <h4 className="font-bold">Hatch Time</h4>
          <hr className="w-5/6"></hr>
          <p>
            {pokeState.pokemon?.hatchTime ? `${pokeState.pokemon.hatchTime} Cycles` : '--'}
          </p>
        </section>
      </div>

      <div id='bio-rates' className="flex md:flex-col justify-around w-full sm:h-1/4">
        <section id='pokemon-bio-growth' className="w-1/2 md:w-full flex flex-col items-center">
          <h4 className="font-bold">Growth Rate</h4>
          <hr className="w-5/6"></hr>
          <p>
            {pokeState.pokemon?.name ? capitalizeWord(pokeState?.pokemon?.growthRate.name) : '--'}
          </p>
        </section>

        <section id='pokemon-bio-catch' className="w-1/2 md:w-full flex flex-col items-center">
          <h4 className="font-bold">Catch Rate</h4>
          <hr className="w-5/6"></hr>
          <p>{pokeState.pokemon?.catchRate ? `${(pokeState?.pokemon?.catchRate / 255 * 100).toFixed(2)}%` : '--'}</p>
        </section>
      </div>

      <div id='bio-yields' className="flex md:flex-col justify-around w-full sm:h-1/4">
        <section id='pokemon-bio-ev' className="w-1/2 md:w-full flex flex-col items-center">
          <h4 className="font-bold">EXP Yield</h4>
          <hr className="w-5/6"></hr>
          <p>{pokeState.pokemon?.baseExpYield ? `${pokeState.pokemon.baseExpYield}EXP` : '--'}</p>
        </section>

        <section id='pokemon-bio-exp' className="w-1/2 md:w-full flex flex-col items-center">
          <h4 className="font-bold">EV Yield</h4>
          <hr className="w-5/6"></hr>
          <p>{pokeState.pokemon?.evYields ? pokeState?.pokemon?.evYields.map((element) => {
            if (element.yield) {
              return `${element.yield} ${element.name}`
            }
          }) : `--`}</p>
        </section>
      </div>

    </div>
  )

}

export default DetailedInfo;