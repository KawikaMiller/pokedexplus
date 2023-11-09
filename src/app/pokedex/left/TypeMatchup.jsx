import React from "react";
import TypeBadge from "../accessory/TypeBadge";

function TypeMatchup() {

  return (
    <div id='pokemon-type-matchup' className="w-2/3 mr-1 flex flex-col justify-evenly bg-transparent/50">
      <section className="flex h-full">
        <h4 className="w-1/3">Weak To: </h4>
        <div className="bg-transparent/25 w-2/3 flex flex-wrap items-center justify-center">
          <TypeBadge type='Fire' />
        </div>
      </section>
      <section className="flex h-full my-1">
        <h4 className="w-1/3">Resistant To: </h4>
        <div className="bg-transparent/50 w-2/3"></div>
      </section>
      <section className="flex h-full">
        <h4 className="w-1/3">Immune To: </h4>
        <div className="bg-transparent/25 w-2/3"></div>
      </section>
    </div>
  )

}

export default TypeMatchup;