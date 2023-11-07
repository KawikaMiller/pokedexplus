import React from "react";
import PokemonArt from "./PokemonArt";
import BasicInfo from "./BasicInfo";

function LeftSide(props){

  return(
    <div id='left-side' className="bg-pkRed" style={{border: '1px solid red'}}>

      <div id='left-side-header' className="flex justify-between p-2">
        <p>prev</p>
        <div>searchbar goes here?</div>
        <p>next</p>
      </div>

      <div id='left-side-top' className="flex h-3/6">
        <div id='left-side-top-left' className="bg-transparent m-2 w-2/3 h-auto flex flex-col justify-between">
          <PokemonArt />
          <BasicInfo />


          <div id='pokemon-image-toggles' className="flex justify-around items-center" style={{ height: '10%'}}>
            <button className="border-red-100 bg-blue-500 w-1/4 p-2 hover:bg-cyan-300 m-0.5">Cry</button>
            <button className="border-red-100 bg-blue-500 w-1/4 p-2 hover:bg-cyan-300 m-0.5">Shiny</button>
            <button className="border-red-100 bg-blue-500 w-1/4 p-2 hover:bg-cyan-300 m-0.5">Mega</button>
            <button className="border-red-100 bg-blue-500 w-1/4 p-2 hover:bg-cyan-300 m-0.5">Dyna</button>
          </div>
        </div>

        <div id='left-side-top-right' className="m-2 w-1/3 flex flex-col justify-between items-center bg-transparent/50">

          <section id='pokemon-bio-height' className="w-full flex flex-col items-center">
            <h4 className="font-bold">Height</h4>
            <hr className="w-5/6"></hr>
            <p>9'99"</p>
          </section>

          <section id='pokemon-bio-weight' className="w-full flex flex-col items-center">
            <h4 className="font-bold">Weight</h4>
            <hr className="w-5/6"></hr>
            <p>999kgs</p>
          </section>

          <section id='pokemon-bio-gender' className="w-full flex flex-col items-center">
            <h4 className="font-bold">Gender Ratio</h4>
            <hr className="w-5/6"></hr>
            <p>progress bar here</p>
          </section>

          <section id='pokemon-bio-egg' className="w-full flex flex-col items-center">
            <h4 className="font-bold">Egg Group</h4>
            <hr className="w-5/6"></hr>
            <p>Monster | Grass</p>
          </section>

          <section id='pokemon-bio-hatch' className="w-full flex flex-col items-center">            
            <h4 className="font-bold">Hatch Time</h4>
            <hr className="w-5/6"></hr>
            <p>99 Cycles</p>
          </section>

          <section id='pokemon-bio-growth' className="w-full flex flex-col items-center">            
            <h4 className="font-bold">Growth Rate</h4>
            <hr className="w-5/6"></hr>
            <p>Medium-Slow</p>
          </section>

          <section id='pokemon-bio-catch' className="w-full flex flex-col items-center">          
            <h4 className="font-bold">Catch Rate</h4>
            <hr className="w-5/6"></hr>
            <p>999</p>
          </section>

          <section id='pokemon-bio-ev' className="w-full flex flex-col items-center">          
            <h4 className="font-bold">EV Yield</h4>
            <hr className="w-5/6"></hr>
            <p>999 XP</p>
          </section>

          <section id='pokemon-bio-exp' className="w-full flex flex-col items-center">             
            <h4 className="font-bold">EXP Yield</h4>
            <hr className="w-5/6"></hr>
            <p>1SPATK 2SPDEF</p>
          </section>

        </div>
      </div>

      <div id='left-side-mid' className="h-1/5 m-2">
        <div id='pokemon-abilities' className="flex justify-around bg-transparent/50 my-2">
          <p>Ability 1</p>
          <p>Ability 2</p>
          <p>Hidden Ability</p>
        </div>
        <div className="flex justify-between">
          <div id='pokemon-type-matchup' className="w-2/3 mr-1 flex flex-col justify-evenly bg-transparent/50">
            <section className="flex h-full">
              <h4 className="w-1/3">Weak To: </h4>
              <div className="bg-transparent/25 w-2/3"></div>
            </section>
            <section className="flex h-full my-1">
              <h4 className="w-1/3">Resistant To: </h4>
              <div className="bg-transparent/25 w-2/3"></div>
            </section>
            <section className="flex h-full">
              <h4 className="w-1/3">Immune To: </h4>
              <div className="bg-transparent/25 w-2/3"></div>
            </section>
          </div>
          <div id='pokemon-base-stats' className="w-1/3 ml-1 bg-transparent/50 flex flex-col justify-evenly" >
            <section className="flex">
              <h4 className="w-1/3">HP</h4>
              <p className="text-center bg-transparent/25 w-2/3">999</p>
            </section>
            <section className="flex">
              <h4 className="w-1/3">ATK</h4>
              <p className="text-center bg-transparent/25 w-2/3">999</p>
            </section>
            <section className="flex">
              <h4 className="w-1/3">DEF</h4>
              <p className="text-center bg-transparent/25 w-2/3">999</p>
            </section>
            <section className="flex">
              <h4 className="w-1/3">SPATK</h4>
              <p className="text-center bg-transparent/25 w-2/3">999</p>
            </section>
            <section className="flex">
              <h4 className="w-1/3">SPDEF</h4>
              <p className="text-center bg-transparent/25 w-2/3">999</p>
            </section>
            <section className="flex">
              <h4 className="w-1/3">SPD</h4>
              <p className="text-center bg-transparent/25 w-2/3">999</p>
            </section>
          </div>
        </div>
      </div>
      <div id='left-side-bot' style={{height: '20%'}}>
        <div id='pokemon-pokedex-entries' className="my-0 mx-2 flex flex-col border-red-50 border-2 h-full">

          <div id='pokedex-entries-gen-selector' className="flex justify-around" style={{border: '1px solid red'}}>
            <button>I</button>
            <button>II</button>
            <button>III</button>
            <button>IV</button>
            <button>V</button>
            <button>VI</button>
            <button>VII</button>
            <button>VIII</button>
            <button>IX</button>
          </div>

          <div id='pokedex-entry-container' className="h-full align-middle flex flex-col justify-start items-center">
            <div id='pokedex-entry-gen-label' className="w-5/6">
              <h5 id='pokedex-entry-gen-text' className="text-center">Gen I : Red</h5>
              <hr></hr>
            </div>
            <p id="pokedex-entry-text" className="text-center my-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, est vel totam sapiente corporis eveniet eos incidunt quaerat. Eius, nemo?
            </p>
          </div>

        </div>
    </div>
    </div>
  )

}

export default LeftSide;