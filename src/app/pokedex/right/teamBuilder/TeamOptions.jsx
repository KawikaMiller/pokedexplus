import MT from "@/app/lib/clientmaterialtailwind";
import React from "react";

function TeamOptions() {

  return (
    <div id='team-options-container' className="bg-transparent/50 flex flex-col justify-between h-full w-full p-0.5">
      <MT.Button size="sm" color="blue" className="m-0.5">Type Chart</MT.Button>
      <MT.Button size="sm" color="blue" className="m-0.5">Save Team</MT.Button>
      <MT.Button size="sm" color="blue" className="m-0.5">Load Team</MT.Button>
      <MT.Button size="sm" color="red" className="m-0.5">New Team</MT.Button>
    </div>
  )

}

export default TeamOptions;