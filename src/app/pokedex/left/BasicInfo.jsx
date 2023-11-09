import React from "react";
import TypeBadge from "../accessory/TypeBadge";

function BasicInfo(props) {

  return(
    <div id='pokemon-basic-info'className="lg:h-2/3 flex flex-col justify-between">

      <div>
        <div id='basic-info-top' className="flex justify-between items-center h-1/2">
          <h1 id='pokemon-name' className="font-bold text-3xl">Bulbasaur</h1> 
          <h1 id='pokemon-number' className="self-end font-medium lg:font-semibold text-xl lg:text-3xl h-full">#0001</h1>
        </div>

        <div id='basic-info-bot' className="flex justify-between items-center">
          <h1 id='pokemon-category' className="">The Seed Pokemon</h1> 
          <div id='pokemon-types' className="flex justify-end w-1/3">
            <div id='type1' className="w-fit pr-1 text-center">
              <TypeBadge type='Grass'/>
            </div>
            <div id='type2' className="w-fit pl-1 text-center">
              <TypeBadge type='Poison'/>
            </div>
          </div>
        </div>        
      </div>

      <div id='pokemon-image-toggles' className="flex justify-around items-center">
        <button className="border-red-100 bg-blue-500 w-1/4 p-2 hover:bg-cyan-300 m-0.5">Cry</button>
        <button className="border-red-100 bg-blue-500 w-1/4 p-2 hover:bg-cyan-300 m-0.5">Shiny</button>
        <button className="border-red-100 bg-blue-500 w-1/4 p-2 hover:bg-cyan-300 m-0.5">Mega</button>
        <button className="border-red-100 bg-blue-500 w-1/4 p-2 hover:bg-cyan-300 m-0.5">Dyna</button>
      </div>

    </div>
  )

}

export default BasicInfo;