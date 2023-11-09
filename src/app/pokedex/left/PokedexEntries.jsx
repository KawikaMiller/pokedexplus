import React from "react";

function PokedexEntries() {

  return (
    <div id='left-side-bot' className="mb-2" style={{ height: '20%' }}>
      <div id='pokemon-pokedex-entries' className="my-0 mx-2 flex flex-col border-red-50 border-2 h-full">

        <div id='pokedex-entries-gen-selector' className="flex justify-around" style={{ border: '1px solid red' }}>
          <button className="w-full mx-1 hover:cursor-pointer bg-black/50">I</button>
          <button className="w-full mx-1 hover:cursor-pointer bg-black/50">II</button>
          <button className="w-full mx-1 hover:cursor-pointer bg-black/50">III</button>
          <button className="w-full mx-1 hover:cursor-pointer bg-black/50">IV</button>
          <button className="w-full mx-1 hover:cursor-pointer bg-black/50">V</button>
          <button className="w-full mx-1 hover:cursor-pointer bg-black/50">VI</button>
          <button className="w-full mx-1 hover:cursor-pointer bg-black/50">VII</button>
          <button className="w-full mx-1 hover:cursor-pointer bg-black/50">VIII</button>
          <button className="w-full mx-1 hover:cursor-pointer bg-black/50">IX</button>
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
  )

}

export default PokedexEntries;