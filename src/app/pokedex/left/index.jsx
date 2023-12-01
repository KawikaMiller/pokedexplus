import React from "react";
import PokemonArt from "./PokemonArt";
import BasicInfo from "./BasicInfo";
import DetailedInfo from "./DetailedInfo";
import Abilities from "./Abilities";
import TypeMatchup from "./TypeMatchup";
import BaseStats from "./BaseStats";
import PokedexEntries from "./PokedexEntries";
import SearchBar from "../SearchBar";

import { useDispatch, useSelector } from "react-redux";
import pokeSlice from "@/app/reduxStore/pokeSlice";

function LeftSide(props){

  return(
    <div id='left-side' className="bg-pkRed lg:w-1/2 flex flex-col justify-between rounded-t-md lg:rounded-l-md lg:rounded-tr-none">

      <div id='left-side-header' className="flex justify-between py-1 px-2">
        <div className="w-fit flex justify-between">
          <div className="bg-cyan-400 w-10 h-10 rounded-[50%] border-4"></div>
          <div className="bg-red-600 w-4 h-4 rounded-[50%] border-2"></div>
          <div className="bg-yellow-300 w-4 h-4 rounded-[50%] border-2"></div>
          <div className="bg-green-500 w-4 h-4 rounded-[50%] border-2"></div>
        </div>
        <div className="w-5/6 flex justify-end pl-6 items-center">
          {/* <p>prev</p> */}
          <SearchBar />
          {/* <p>next</p> */}
        </div>
      </div>

      <div id='left-side-top' className="flex flex-col items-center md:items-stretch h-full min-h-0 min-w-0 md:flex-row md:justify-center">
        <div id='left-side-top-left' className="bg-transparent m-2 w-fit flex flex-col justify-between min-h-0 min-w-0 lg:max-h-full">
          <PokemonArt />
          <BasicInfo />
          <div id='pokemon-image-toggles' className="flex justify-around items-center">
            <button className="border-red-100 bg-blue-500 w-1/4 p-2 hover:bg-cyan-300 mx-0.5">Cry</button>
            <button className="border-red-100 bg-blue-500 w-1/4 p-2 hover:bg-cyan-300 mx-0.5">Shiny</button>
            <button className="border-red-100 bg-blue-500 w-1/4 p-2 hover:bg-cyan-300 mx-0.5">Mega</button>
            <button className="border-red-100 bg-blue-500 w-1/4 p-2 hover:bg-cyan-300 mx-0.5">Dyna</button>
          </div>
        </div>
        <DetailedInfo />
      </div>

      <div id='left-side-mid' className="h-1/5 lg:h-fit m-2">
        <Abilities />

        <div className="flex bg-slate-500 mt-4">
          <h4 className="text-lg w-2/3">Type Matchups</h4>
          <h4 className="text-lg w-1/3">Base Stats</h4>
        </div>
        
        <div className="flex justify-between">
          <TypeMatchup />
          <BaseStats />
        </div>
      </div>

      {/* <PokedexEntries /> */}
    </div>
  )

}

export default LeftSide;