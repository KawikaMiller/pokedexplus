import MT from "@/app/lib/clientmaterialtailwind";
import React from "react";

function TeamOptions() {

  return (
    <div id='team-options-container' className="flex justify-evenly w-full min-h-0 h-full">
      <MT.Button size="sm" color="green" className="m-0.5">New Team</MT.Button>
      <MT.Button size="sm" color="blue" className="m-0.5">Save Team</MT.Button>
      <MT.Button size="sm" color="blue" className="m-0.5">Load Team</MT.Button>
      <MT.Button size="sm" color="blue" className="m-0.5">Type Coverage</MT.Button>
    </div>
  )

}

export default TeamOptions;