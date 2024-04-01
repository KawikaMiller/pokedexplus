import React, { useRef, useEffect, useState } from "react";
import MT from "@/app/lib/clientmaterialtailwind";
import TypeBadge from "../../accessory/TypeBadge";
import DamageBadge from "../../accessory/DamageBadge";
import { capitalizeWord, removeHyphen } from "@/app/lib/helpers";
import { modalStyle } from "../../styles/tailwindClasses";

function MoveDetails(props) {

  let keys = useRef([])
  const [needsMargin, setNeedsMargin] = useState(false)

  // custom hook to detect changes in screen width
  // const useScreenWidth = () => {
  //   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // }

  // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenWidth, setScreenWidth] = useState(400);

  // useEffect(() => {
  //   const handleWidthChange = () => {
  //     setScreenWidth(window.innerWidth)
  //   };

  //   window.addEventListener('resize', handleWidthChange);

  //   return () => {
  //     window.removeEventListener('resize', handleWidthChange)
  //   }
  // }, [])

  useEffect(() => {
    props.dialogMove?.meta ?
      keys.current = Object.keys(props.dialogMove?.meta)
      :
      null;

      if(Object.values(props.dialogMove.meta || {}).every(value => !value) == false){
        setNeedsMargin(true)
      } else {
        setNeedsMargin(false)
      }
  }, [props.dialogMove])


  return (
    props.showDialog ?
      <MT.Dialog key={'move-dialog'} open={props.showDialog} handler={() => props.setShowDialog(false)} className={modalStyle.container}>
        <MT.DialogHeader className={modalStyle.header}>
          {capitalizeWord(removeHyphen(props.dialogMove?.name || 'move-name'))}
        </MT.DialogHeader>
        <MT.DialogBody className={modalStyle.body}>

          {/* move description */}
          <div className="flex flex-col justify-center items-center w-full md:w-2/3 py-4 text-center font-bold mb-2">
            {
              <>
                <p>{props.dialogMove?.description || '--'}</p>
                {/* <p>{props.dialogMove.flavorTextEntries ? props.dialogMove.flavorTextEntries[0].flavorText : '--'}</p> */}
              </>
            }
          </div>

          {/* basic move info */}
          <div className="w-full bg-black/20 flex-col justify-around items-center text-white">
            <section id='modal-move-main-labels' className="flex justify-between items-center bg-black/50 p-2 text-white [&>*]:w-1/5 [&>*]:text-center">
              <p className="font-bold">{screenWidth < 500 ? 'Pow' : 'Power'}</p>
              <p className="font-bold">{screenWidth < 500 ? 'Acc' : 'Accuracy'}</p>
              <p className="font-bold">PP</p>
              <p className="font-bold">{screenWidth < 500 ? 'Dmg' : 'Damage'}</p>
              <p className="font-bold">Type</p>
            </section>
            <section className="flex items-center justify-between p-2 [&>*]:w-1/5 [&>*]:text-center">
              <p>{props.dialogMove.power || '--'}</p>
              <p>{props.dialogMove.accuracy || '--'}</p>
              <p>{props.dialogMove.pp || '--'}</p>
              <div className="flex justify-center items-center">
                <DamageBadge dmgClass={props.dialogMove.dmgClass || '--'} />
              </div>
              <div className="flex justify-center items-center">
                <TypeBadge type={props.dialogMove.type || '--'} />
              </div>
            </section>
          </div>

          {/* type effectiveness and meta move info */}
          <div className="w-full flex sm:flex-col md:flex-row justify-center my-2 has">

            {/* move type effectiveness */}
            {
              props.dialogMove.dmgClass !== 'status' ?
                <div id='move-type-effectiveness' className={`grow max-w-2/3 text-white ${needsMargin ? 'mr-2' : null}`}>

                  <div className="flex min-h-1/3 items-stretch bg-black/25 min-h-10 h-10">
                    <b className="min-w-[3rem] font-bold bg-black/50 flex justify-center items-center ">x2</b>
                    <div className="p-1 flex overflow-x-auto">
                      {
                        props.dialogMoveTyping?.doubleDamageTo?.map(el => <TypeBadge type={el.name} />)
                      }
                    </div>
                  </div>

                  <div className="flex min-h-1/3 items-stretch bg-black/50 min-h-10 h-10">
                    <b className="min-w-[3rem] font-bold bg-black/50 flex justify-center items-center ">x0.5</b>
                    <div className="p-1 flex overflow-x-auto">
                      {
                        props.dialogMoveTyping?.halfDamageTo?.map(el =>
                          <TypeBadge type={el.name} />
                        )
                      }
                    </div>
                  </div>

                  <div className="flex min-h-1/3 items-stretch bg-black/25 min-h-10 h-10">
                    <b className="min-w-[3rem] font-bold bg-black/50 flex justify-center items-center ">x0</b>
                    <div className="p-1 flex overflow-x-auto">
                      {
                        props.dialogMoveTyping?.noDamageTo?.map(el => <TypeBadge type={el.name} />)
                      }
                    </div>
                  </div>

                </div>
                :
                null
            }

            {/* detailed move info */}
            {/* renders meta move data if the value is truthy */}
            {
              Object.values(props.dialogMove.meta).every(value => !value) == false ?
                <div className="flex-col justify-evenly items-center text-white min-w-1/3 grow [&>*:nth-child(even)>*:first-child]:bg-red-700 [&>*:nth-child(even)>*:last-child]:bg-black/50 [&>*:nth-child(odd)>*:first-child]:bg-red-400 [&>*:nth-child(odd)>*:last-child]:bg-black/30">
                  {
                    keys.current.map((key) => {
                      if (props.dialogMove.meta[key]) {
                        return (
                          <div className="flex items-center justify-center">
                            <p className="w-2/3 text-center font-bold">{capitalizeWord(key.replace(/([a-z0-9])([A-Z])/g, '$1 $2'))}</p>
                            <p className="w-1/3 text-center">{props.dialogMove.meta[key] || '--'}</p>
                          </div>
                        )
                      }

                    })
                  }
                </div>
                :
                null
            }
          </div>

        </MT.DialogBody>
        <MT.DialogFooter className={modalStyle.footer}>
          <MT.Button onClick={() => props.setShowDialog(false)} variant="filled" color="red">Back</MT.Button>
        </MT.DialogFooter>
      </MT.Dialog>
      :
      null

  )

}

export default MoveDetails;