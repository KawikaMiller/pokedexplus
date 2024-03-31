import React, { useState, useEffect } from "react";
import axios from "axios";
import MoveTabs from "./MoveTabs";
import MoveRowSort from "./MoveRowSort";
import MoveRow from "./MoveRow";
import MT from "@/app/lib/clientmaterialtailwind";

import { useSelector } from "react-redux";
import { capitalizeWord, removeHyphen } from "@/app/lib/helpers";
import { modalStyle } from "../../styles/tailwindClasses";
import TypeBadge from "../../accessory/TypeBadge";
import DamageBadge from "../../accessory/DamageBadge";

function Moves(props) {
  const [levelMoves, setLevelMoves] = useState([]);
  const [tmMoves, setTmMoves] = useState([]);
  const [tutorMoves, setTutorMoves] = useState([]);
  const [eggMoves, setEggMoves] = useState([]);
  const [activeMoves, setActiveMoves] = useState(undefined);
  const [generationMoves, setGenerationMoves] = useState({});

  // dialog
  const [showDialog, setShowDialog] = useState(false)
  const [dialogMove, setDialogMove] = useState({})
  const [dialogMoveTyping, setDialogMoveTyping] = useState({})

  // sort by 
  const [isAscending, setIsAscending] = useState(true)
  const [movesKey, setMovesKey] = useState('level');
  const [activeVersion, setActiveVersion] = useState('red-blue');

  const pokeState = useSelector(state => state.pokemon);

  const button = 'h-full w-full rounded-md bg-blue-500 mx-[0.125rem]';
  const row = "text-center align-middle py-1 px-0 overflow-x-hidden flex items-center justify-between"
  const numAndImg = 'max-w-[13%] md:max-w-[10%] grow-[0.5]'
  const str = 'max-w-[22%] md:max-w-[40%] grow-[1]'

  let gensWithMoves = {
    'red-blue': false,
    yellow: false,
    'gold-silver': false,
    crystal: false,
    'ruby-sapphire': false,
    emerald: false,
    'firered-leafgreen': false,
    colosseum: false,
    xd: false,
    'diamond-pearl': false,
    platinum: false,
    'heartgold-soulsilver': false,
    'black-white': false,
    'black-2-white-2': false,
    'x-y': false,
    'omega-ruby-alpha-sapphire': false,
    'sun-moon': false,
    'ultra-sun-ultra-moon': false,
    'lets-go-pikachu-lets-go-eevee': false,
    'sword-shield': false,
    'brilliant-diamond-and-shining-pearl': false,
    'legends-arceus': false,
    'scarlet-violet': false,
  }

  // this runs all four previous parse methods
  const parseMovesByGeneration = (version) => {
    let levelArr = [];
    let tmArr = [];
    let tutorArr = [];
    let eggArr = [];

    pokeState.pokemon?.moves.forEach(move => {
      move.versionDetails.forEach(details => {

        if (!gensWithMoves[details.version]) {
          gensWithMoves[details.version] = true;
        };


        if (details.version === version) {
          let nMove = { ...move };
          nMove.learnMethod = details.learnMethod;
          nMove.levelLearned = details.levelLearned;
          switch (details.learnMethod) {
            case 'level-up':
              levelArr.push(nMove);
              break;
            case 'machine':
              tmArr.push(nMove);
              break;
            case 'tutor':
              tutorArr.push(nMove);
              break;
            case 'egg':
              eggArr.push(nMove);
              break;
            default:
              console.log('error parsing moves by learn method');
          }
        }
      })
    })

    setLevelMoves(levelArr);
    setTmMoves(tmArr);
    setTutorMoves(tutorArr);
    setEggMoves(eggArr);
  }

  const updateActiveMoves = () => {
    switch (movesKey) {
      case 'level':
        setActiveMoves(levelMoves);
        break;
      case 'machine':
        setActiveMoves(tmMoves);
        break;
      case 'egg':
        setActiveMoves(eggMoves);
        break;
      case 'tutor':
        setActiveMoves(tutorMoves);
        break;
      default:
        break;
    };
  }

  const sortMoves = (property) => {
    if (activeMoves?.length) {
      let temp = [...activeMoves];
      !isAscending ?
        temp = temp.sort((a, b) => (
          a[property] === b[property] ? 0 : a[property] < b[property] ? -1 : 1
        ))
        :
        temp = temp.sort((a, b) => (
          a[property] === b[property] ? 0 : a[property] < b[property] ? 1 : -1
        ))

      setIsAscending(!isAscending)
      setActiveMoves(temp)
    }
  }

  const handleMoveClick = async (move) => {
    await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/type/${move.type}`).then(res => setDialogMoveTyping(res.data))
    setDialogMove(move);
    setShowDialog(!showDialog);
  }

  // parses moves and sorts them by learn method depending on what generation of moves we want to see (e.g. will only show moves from gen 2 and separates the level, machine, egg, tutor moves for that generation)
  useEffect(() => {
    parseMovesByGeneration(activeVersion);
    setGenerationMoves(gensWithMoves);
  }, [pokeState.pokemon, activeVersion]) //eslint-disable-line

  // allows moves to initially render after moves have been parsed for the first time
  useEffect(() => {
    let temp = [...levelMoves];
    temp.sort((a, b) => (
      a.levelLearned === b.levelLearned ? 0 : a.levelLearned < b.levelLearned ? -1 : 1
    ))
    setActiveMoves(temp);
    setMovesKey('level');
  }, [levelMoves])

  // updates rendered moves whenever a move tab is clicked (i.e. level, machine, egg, tutor)
  useEffect(() => {
    updateActiveMoves();
  }, [movesKey]) //eslint-disable-line

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

  // useEffect(() => { console.log(activeVersion) }, [activeVersion])

  return (
    <>
      <div id='right-body-top'>
        <div id='move-tabs-container' className="mx-2 mt-2 border">
          <MoveTabs generationMoves={generationMoves} setActiveVersion={setActiveVersion} setMovesKey={setMovesKey} />
        </div>
      </div>

      <div className=" overflow-y-auto min-h-0 h-full bg-black/50  border mx-2">
        <div className="sticky top-0 z-[100] bg-black">
          <MoveRowSort css={{ button, row, numAndImg, str }} sortMoves={sortMoves} isAscending={isAscending} />
        </div>
        {
          activeMoves?.length ?
            activeMoves.map((move, idx) => {
              return <MoveRow css={{ button, row, numAndImg, str }} move={move} alt={idx % 2 ? `bg-black/25` : `bg-black/40`} movesKey={movesKey} key={move.name + move.levelLearned} activeVersion={activeVersion} handleClick={() => handleMoveClick(move)} />
            })
            :
            <div className="text-center">missingMoveData</div>
        }
      </div>

      <MT.Dialog open={showDialog} handler={() => setShowDialog(false)}>
        <MT.DialogHeader className={modalStyle.header}>
          {capitalizeWord(removeHyphen(dialogMove?.name || 'move-name'))}
          <MT.Button onClick={() => setShowDialog(false)} variant="outlined" color="white">X</MT.Button>
        </MT.DialogHeader>
        <MT.DialogBody className={modalStyle.body}>
          {/* basic move info */}
          <div className="w-full bg-black/20 flex-col justify-around items-center">
            <section id='modal-move-main-labels' className="flex justify-between items-center bg-black/50 p-2 text-white [&>*]:w-1/5 [&>*]:text-center">
              <p className="font-bold">{screenWidth < 500 ? 'Pow' : 'Power'}</p>
              <p className="font-bold">{screenWidth < 500 ? 'Acc' : 'Accuracy'}</p>
              <p className="font-bold">PP</p>
              <p className="font-bold">{screenWidth < 500 ? 'Dmg' : 'Damage'}</p>
              <p className="font-bold">Type</p>
            </section>
            <section className="flex items-center justify-between p-2 [&>*]:w-1/5 [&>*]:text-center">
              <p>{dialogMove.power || '--'}</p>
              <p>{dialogMove.accuracy || '--'}</p>
              <p>{dialogMove.pp || '--'}</p>
              <div className="flex justify-center items-center">
                <DamageBadge dmgClass={dialogMove.dmgClass || '--'} />
              </div>
              <div className="flex justify-center items-center">
                <TypeBadge type={dialogMove.type || '--'} />
              </div>
            </section>
          </div>

          {/* type effectiveness and description */}
          <div className="w-full flex-col justify-center md:flex-row my-2">

            {/* move description */}
            <div className="flex flex-col justify-center items-center w-full md:w-2/3 h-24 text-center font-bold border mb-2">
              {
                <>
                  <p>{dialogMove?.description || '--'}</p>
                  <p>{dialogMove.flavorTextEntries ? dialogMove.flavorTextEntries[0].flavorText : '--'}</p>
                </>
              }
            </div>

            {/* move type effectiveness */}
            <div>
              {
                dialogMove.dmgClass !== 'status' ?
                  <div id='move-type-effectiveness' className="w-full md:w-1/3 text-white">

                    <div className="flex min-h-1/3 items-stretch bg-black/25 min-h-10 h-10">
                      <b className="w-1/6 font-bold bg-black/50 flex justify-center items-center">x2</b>
                      <div className="p-1 flex">
                        {
                          dialogMoveTyping?.doubleDamageTo?.map(el => <TypeBadge type={el.name} />)
                        }
                      </div>
                    </div>

                    <div className="flex min-h-1/3 items-stretch bg-black/50 min-h-10 h-10">
                      <b className="w-1/6 font-bold bg-black/50 flex justify-center items-center">x0.5</b>
                      <div className="p-1 flex">
                        {
                          dialogMoveTyping?.halfDamageTo?.map(el => <TypeBadge type={el.name} />)
                        }
                      </div>
                    </div>

                    <div className="flex min-h-1/3 items-stretch bg-black/25 min-h-10 h-10">
                      <b className="w-1/6 font-bold bg-black/50 flex justify-center items-center">x0</b>
                      <div className="p-1 flex">
                        {
                          dialogMoveTyping?.noDamageTo?.map(el => <TypeBadge type={el.name} />)
                        }
                      </div>
                    </div>

                  </div>
                  :
                  null
              }
            </div>
          </div>

          {/* detailed move info */}
          <div className="w-full border border-green-500 bg-black/20 flex justify-around items-center p-2">
            {/* renders meta move data if the value is truthy */}
            {
              dialogMove.meta ?
                Object.keys(dialogMove.meta).map(key => (
                  dialogMove.meta[key] ?
                    <section className="flex flex-col items-center justify-center">
                      <p className="font-bold">{key}</p>
                      {dialogMove.meta[key]}
                    </section>
                    :
                    null
                ))
                :
                null
            }
          </div>

        </MT.DialogBody>
        <MT.DialogFooter className={modalStyle.footer}>
          <p>modal footer</p>
        </MT.DialogFooter>
      </MT.Dialog>
    </>
  )

}

export default Moves;