import MT from "@/app/lib/clientmaterialtailwind";
import React from "react";

function TeamOptions() {

  return (
    <div id='team-options-container' className="border flex justify-between h-full w-full p-0.5">
      <div className="flex flex-col w-1/2 h-full">
      <MT.Button size="sm" color="blue" className="m-0.5 p-0.5">Type Chart</MT.Button>
      <MT.Button size="sm" color="red" className="m-0.5 p-0.5">New</MT.Button>
      </div>
      <div className="flex flex-col w-1/2 h-full">
      <MT.Button size="sm" color="blue" className="m-0.5 p-0.5">Save</MT.Button>
      <MT.Button size="sm" color="blue" className="m-0.5 p-0.5">Load</MT.Button>
      </div>

    </div>
  )

}

export default TeamOptions;