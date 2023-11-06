import React from "react";
import PokemonArt from "./PokemonArt";

function LeftSide(props){

  return(
    <div id='left-side' className="bg-red-700" style={{border: '1px solid red'}}>
      <div id='left-side-top' className="flex h-3/5">
        <div id='left-side-top-left' className="bg-transparent m-2 w-2/3 h-auto">
          <div id='pokemon-image' className="h-2/3 bg-cyan-400 border-8 rounded-md border-white border-solid">
            <PokemonArt />
          </div>
          <div id='pokemon-image-toggles' style={{border: '1px solid red', height: '10%'}}>
            toggles go here
          </div>
          <div id='pokemon-basic-info' style={{border: '1px solid red', height: '24%'}}>
            <div id='basic-info-top' className="flex justify-between items-center h-1/2">
              <h1 id='pokemon-name' className="font-bold text-3xl">Bulbasaur</h1> 
              <h1 id='pokemon-number'>#0001</h1>
            </div>
            <div id='basic-info-bot' style={{display: 'flex', justifyContent: 'space-between'}}>
              <h1 id='pokemon-category'>The Seed Pokemon</h1> 
              <div id='pokemon-types' style={{display: 'flex', justifyContent: 'space-between', width: '33%'}}>
                <div id='type1' style={{border: '1px solid red', width: '50%'}}>Type 1</div>
                <div id='type2' style={{border: '1px solid red', width: '50%'}}>Type 2</div>
              </div>
            </div>
          </div>
        </div>
        <div id='left-side-top-right' style={{backgroundColor: 'rgba(125, 55, 200, 0.25)', margin: '0.5rem', width: '33%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
          <section id='pokemon-bio-height'  style={{border: '1px solid green'}}>Height: </section>
          <section id='pokemon-bio-weight'>Weight: </section>
          <section id='pokemon-bio-gender'>Gender Ratio: </section>
          <section id='pokemon-bio-egg'>Egg Group: </section>
          <section id='pokemon-bio-hatch'>Hatch Time: </section>
          <section id='pokemon-bio-growth'>Growth Rate: </section>
          <section id='pokemon-bio-catch'>Catch Rate: </section>
          <section id='pokemon-bio-ev'>EV Yield: </section>
          <section id='pokemon-bio-exp'>EXP Yield: </section>
        </div>
      </div>
      <div id='left-side-mid' style={{height: '20%', display: 'flex', justifyContent: 'space-between'}}>
        <div id='pokemon-type-matchup' style={{border: '1px solid red', width: '66%', margin: '0.5rem'}}>
          type matchup
        </div>
        <div id='pokemon-base-stats'  style={{border: '1px solid red', width: '33%', margin: '0.5rem'}}>
          base stats
        </div>
      </div>
      <div id='left-side-bot' style={{height: '20%'}}>
        <div id='pokemon-pokedex-entries' style={{border: '1px solid red', height: 'calc(100% - 0.5rem)', margin: '0 0.5rem'}}>
          <div id='pokedex-entries-gen-selector' style={{border: '1px solid red'}}>
            pokedex gen selctor
          </div>
            pokedex entry
        </div>
    </div>
    </div>
  )

}

export default LeftSide;