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
import PokemonFormsAndCry from "./PokemonFormsAndCry";

function LeftSide(props) {

  return (
    <div id='left-side' className="bg-pkRed lg:w-1/2 flex flex-col rounded-t-md lg:rounded-l-md lg:rounded-tr-none p-2 max-h-[100%] min-h-0">

      <div id='left-header' className="min-h-[3rem] w-full flex justify-between border-b-2 border-b-black/25 p-1">
        <div className="w-fit flex justify-between">
          <div className="bg-cyan-400 w-10 h-10 rounded-[50%] mx-1 border-4"></div>
          <div className="bg-red-600 w-4 h-4 rounded-[50%] mx-1 border-2"></div>
          <div className="bg-yellow-300 w-4 h-4 rounded-[50%] mx-1 border-2"></div>
          <div className="bg-green-500 w-4 h-4 rounded-[50%] mx-1 border-2"></div>
        </div>
        <div className="w-1/3 lg:w-5/6 flex justify-end pl-6 items-center">
        {/* <p>prev</p> */}
        <SearchBar />
        {/* <p>next</p> */}
        </div>
      </div>


      <div id="left-body" className="flex flex-col justify-between min-h-0 lg:h-full">

        <div id="left-body-top" className="flex flex-col lg:flex-row h-fit lg:h-[75%]">
          <div id='art-and-basic-container' className="flex flex-col w-auto m-2 min-h-fit justify-between lg:w-2/3 border">
            <PokemonArt />
            <BasicInfo />
          </div>
          <div id='detailed-info-container' className="flex-grow m-2 w-auto lg:w-1/3 border">
            <DetailedInfo />
          </div>
        </div>

        <div id="left-body-bot" className="flex min-h-0">
          <div id='type-matchup-container' className="flex flex-col mx-2 justify-between w-2/3 lg:w-2/3 lg:min-w-0 border">
            <TypeMatchup />
          </div>
          <div id='abilities-and-base-stats-container' className="flex flex-col justify-between mx-2 h-full w-1/3 lg:w-1/3 border">
            <BaseStats />
          </div>
        </div>

      </div>
    </div>

  )

}

export default LeftSide;

// (<div id='left-body-top' className="flex flex-col items-center h-full min-h-0 min-w-0 md:flex-row md:justify-between md:items-stretch max-w-3/4">
// <div id='left-body-top-a' className="bg-transparent m-2 w-fit flex flex-col justify-between min-h-0 min-w-0 lg:max-h-full flex-grow">
//   <PokemonArt />
//   <BasicInfo />
//   {/* <PokemonFormsAndCry /> */}
// </div>
// <DetailedInfo />
// </div>

// <div id='left-side-mid' className="flex flex-col justify-center md:flex-row lg:h-fit max-w-3/4">

// <TypeMatchup key={`type-matchup-container`} />

// <div className="flex flex-col w-auto md:w-1/3 m-2">
//   <Abilities />
//   <BaseStats />
// </div>

// {/* <div className="flex bg-slate-500 mt-4 w-full">
//   <h4 className="text-lg w-2/3">Type Matchups</h4>
//   <h4 className="text-lg w-1/3">Base Stats</h4>
// </div> */}
// </div>

// {/* <PokedexEntries /> */})