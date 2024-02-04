import React, { useRef, useEffect } from "react";
import MT from "@/app/lib/clientmaterialtailwind";
import TypeBadge from "../../accessory/TypeBadge";
import { capitalizeWord, removeHyphen } from "@/app/lib/helpers";
import { modalStyle } from "../../styles/tailwindClasses";

function MoveDetails(props) {

  let keys = useRef([])

  useEffect(() => {
    props.move?.meta ? 
    keys.current = Object.keys(props.move?.meta)
    :
    null
  }, [props.move])
  

  return (
    props.move ?
      <MT.Dialog open={props.showMoveModal} handler={() => props.setShowMoveModal(false)} className={modalStyle.container}>
        <MT.DialogHeader className={modalStyle.header}>
            {capitalizeWord(removeHyphen(props.move.name))}
            <TypeBadge type={props.move.type} />
        </MT.DialogHeader>
        <MT.DialogBody className={modalStyle.body}>
          {/* {props.move.description} */}
          {props.move.flavorTextEntries[props.move.flavorTextEntries.length - 1].flavorText}
          <hr className="w-full my-2"></hr>
          <div className="flex justify-between w-full text-xs">
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
          </div>
          <hr className="w-full my-2"></hr>
          <div className="flex justify-evenly">
            {
              keys.current.length ? keys.current.map((key) => {
                if (props.move.meta[key]) {
                  return (
                    <div className="flex flex-col justify-center items-center text-xs">
                      <p className="font-bold underline">{
                        capitalizeWord(key.replace(/([a-z0-9])([A-Z])/g, '$1 $2'))
                      }</p>
                      <p className={
                        (typeof props.move.meta[key] === 'number' ?
                        props.move.meta[key] > 0 ? `text-green-800` : 
                        props.move.meta[key] < 0 ? `text-red-600` :
                        `text-black` : 'text-black') + ' font-black'
                        
                      }>
                        {
                          props.move.meta[key]
                        }
                      </p>
                    </div>
                  )
                }
              }) : null
            }
          </div>
        </MT.DialogBody>
        <MT.DialogFooter className={modalStyle.footer}>

          <MT.Button size='sm' variant="filled" color="red" className="text-white" onClick={() => props.setShowMoveModal(false)}>X</MT.Button>

        </MT.DialogFooter>
      </MT.Dialog>
      :
      null
  )

}

export default MoveDetails;