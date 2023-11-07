import React from "react";
import TypeBadge from "../accessory/TypeBadge";

function BasicInfo(props) {

  return(
    <div id='pokemon-basic-info'className="h-2/3 flex flex-col justify-between">

      <div id='basic-info-top' className="flex justify-between items-center h-1/2">
        <h1 id='pokemon-name' className="font-bold text-3xl">Bulbasaur</h1> 
        <h1 id='pokemon-number' className="font-semibold text-3xl">#0001</h1>
      </div>

      <div id='basic-info-bot' className="flex justify-between items-center">
        <h1 id='pokemon-category' className="">The Seed Pokemon</h1> 
        <div id='pokemon-types' className="flex justify-between w-1/3">
          <div id='type1' className="w-1/2 text-center">
            <TypeBadge type='grass' />
          </div>
          <div id='type2' className="w-1/2 text-center">
            <TypeBadge type='poison' />
          </div>
        </div>
      </div>

    </div>
  )

}

export default BasicInfo;