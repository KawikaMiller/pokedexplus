import React from "react";

function DetailedInfo() {
  return (
    <div id='detailed-info' className="w-auto md:w-1/3 m-2 flex flex-wrap md:flex-nowrap md:flex-col justify-between items-center bg-transparent/50">   

      <div id='bio-height-weight-gender' className="flex md:flex-col justify-around w-full sm:h-2/5 sm:justify-evenly">
        <div className="w-1/2 sm:h-1/2 md:w-full flex md:flex-col justify-around">
          <section id='pokemon-bio-height' className="w-max md:w-full flex flex-col items-center">
            <h4 className="font-bold">Height</h4>
            <hr className="w-full md:w-5/6"></hr>
            <p>9'99"</p>
          </section>

          <section id='pokemon-bio-weight' className="w-max md:w-full flex flex-col items-center">
            <h4 className="font-bold">Weight</h4>
            <hr className="w-full md:w-5/6"></hr>
            <p>999kgs</p>
          </section>
        </div>

        <section id='pokemon-bio-gender' className="w-1/2 md:w-full flex flex-col items-center">
          <h4 className="font-bold">Gender Ratio</h4>
          <hr className="w-5/6"></hr>
          <p>progress bar</p>
        </section>
      </div>

      <div id='bio-breeding' className="flex md:flex-col justify-around w-full sm:h-1/5">
        <section id='pokemon-bio-egg' className="w-1/2 md:w-full flex flex-col items-center">
          <h4 className="font-bold">Egg Group</h4>
          <hr className="w-5/6"></hr>
          <p>Monster | Grass</p>
        </section>

        <section id='pokemon-bio-hatch' className="w-1/2 md:w-full flex flex-col items-center">
          <h4 className="font-bold">Hatch Time</h4>
          <hr className="w-5/6"></hr>
          <p>99 Cycles</p>
        </section>
      </div>

      <div id='bio-rates' className="flex md:flex-col justify-around w-full sm:h-1/5">
        <section id='pokemon-bio-growth' className="w-1/2 md:w-full flex flex-col items-center">
          <h4 className="font-bold">Growth Rate</h4>
          <hr className="w-5/6"></hr>
          <p>Medium-Slow</p>
        </section>

        <section id='pokemon-bio-catch' className="w-1/2 md:w-full flex flex-col items-center">
          <h4 className="font-bold">Catch Rate</h4>
          <hr className="w-5/6"></hr>
          <p>999</p>
        </section>
      </div>

      <div id='bio-yields' className="flex md:flex-col justify-around w-full sm:h-1/5">
        <section id='pokemon-bio-ev' className="w-1/2 md:w-full flex flex-col items-center">
          <h4 className="font-bold">EV Yield</h4>
          <hr className="w-5/6"></hr>
          <p>999 XP</p>
        </section>

        <section id='pokemon-bio-exp' className="w-1/2 md:w-full flex flex-col items-center">
          <h4 className="font-bold">EXP Yield</h4>
          <hr className="w-5/6"></hr>
          <p>1SPATK 2SPDEF</p>
        </section>
      </div>

    </div>
  )

}

export default DetailedInfo;