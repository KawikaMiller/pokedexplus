import React from "react";
import MT from "@/app/lib/clientmaterialtailwind";
import TypeBadge from "../../accessory/TypeBadge";
import { capitalizeWord, removeHyphen } from "@/app/lib/helpers";

function MoveDetails(props) {

  return (
    props.move ?
      <MT.Dialog open={props.showMoveModal} handler={() => props.setShowMoveModal(false)} className="bg-blue-gray-300 ">
        <MT.DialogHeader className="flex justify-between bg-pkRed border-b-4 border-black rounded-t-md">
          <div className="flex w-fit justify-between items-center">
            {capitalizeWord(removeHyphen(props.move.name))}
            <TypeBadge type={props.move.type} />
          </div>
          <MT.Button size='sm' variant="filled" color="white" className="text-pkRed" onClick={() => props.setShowMoveModal(false)}>X</MT.Button>
        </MT.DialogHeader>
        <MT.DialogBody className="flex flex-col justify-center items-center">
          {props.move.description}
          {/* Priority: {props.move.priority}
          <div className="flex flex-col">
            <p className="font-bold underline">Power</p>
            <span className="font-normal">{props.move.power || '--'}</span>
          </div>
          <p>Accuracy: {props.move.accuracy}</p>
          <p>PP: {props.move.pp}</p>
          <p>Damage: {props.move.dmgClass}</p> */}
          {/* Effect Chance <= need to add */}
          {/* Stat Change Chance <= need to add */}

        </MT.DialogBody>
        <MT.DialogFooter className="flex justify-between items-center bg-white text-black border-t-4 border-black rounded-b-md">

            <div className="flex flex-col justify-center items-center">
              <p className="font-bold underline">Power</p>
              <span className="font-normal">{props.move.power || '--'}</span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="font-bold underline">Accuracy</p>
              <span className="font-normal">{props.move.accuracy || '--'}</span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="font-bold underline">PP</p>
              <span className="font-normal">{props.move.pp || '--'}</span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="font-bold underline">Damage Type</p>
              <span className="font-normal">{props.move.dmgClass || '--'}</span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="font-bold underline">Effect Chance</p>
              <span className="font-normal">TBA</span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="font-bold underline">Stat Change</p>
              <span className="font-normal">TBA</span>
            </div>

        </MT.DialogFooter>
      </MT.Dialog>
      :
      null
  )

}

export default MoveDetails;