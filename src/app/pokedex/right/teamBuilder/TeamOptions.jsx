import React, {useState} from "react";
import MT from "@/app/lib/clientmaterialtailwind";
import TeamTypeChart from "./TypeChart";

function TeamOptions() {
  
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
    <div id='team-options-container' className="flex justify-evenly w-full min-h-0 h-full">
      <MT.Button size="sm" color="green" className="m-0.5">New Team</MT.Button>
      <MT.Button size="sm" color="blue" className="m-0.5">Save Team</MT.Button>
      <MT.Button size="sm" color="blue" className="m-0.5">Load Team</MT.Button>
      <MT.Button size="sm" color="blue" className="m-0.5" onClick={() => setShowDialog(true)}>Type Coverage</MT.Button>
    </div>

    <MT.Dialog size={'xl'} open={showDialog} handler={() => setShowDialog(false)}>
      <MT.DialogHeader className="bg-pkRed rounded-t-md border-b-8 border-black text-white flex justify-between h-16">
        <p>Type Coverage</p>
        <MT.Button variant="outlined" color="white" onClick={() => setShowDialog(false)}>X</MT.Button>
      </MT.DialogHeader>
      <MT.DialogBody className="bg-gray-600">
        <TeamTypeChart />
      </MT.DialogBody>
      <MT.DialogFooter className="border-t-8 border-black h-16">
        
      </MT.DialogFooter>
    </MT.Dialog>
    </>
  )

}

export default TeamOptions;