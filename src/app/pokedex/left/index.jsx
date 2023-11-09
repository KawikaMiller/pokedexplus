import React from "react";
import PokemonArt from "./PokemonArt";
import BasicInfo from "./BasicInfo";
import DetailedInfo from "./DetailedInfo";
import Abilities from "./Abilities";
import TypeMatchup from "./TypeMatchup";
import BaseStats from "./BaseStats";
import PokedexEntries from "./PokedexEntries";

function LeftSide(props){

  return(
    <div id='left-side' className="bg-pkRed">

      <div id='left-side-header' className="flex justify-between p-2">
        <p>prev</p>
        <div>searchbar goes here?</div>
        <p>next</p>
      </div>

      <div id='left-side-top' className="flex flex-col items-center md:items-stretch h-3/6  md:flex-row md:justify-center">
        <div id='left-side-top-left' className="bg-transparent m-2 w-fit lg:w-2/3 h-1/3 lg:h-auto flex flex-col justify-between">
          <PokemonArt />
          <BasicInfo />
        </div>

        <DetailedInfo />
      </div>

      <div id='left-side-mid' className="h-1/5 m-2">
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

      <PokedexEntries />
    </div>
  )

}

export default LeftSide;