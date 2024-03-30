import React, { useState, useEffect } from "react";

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
  const [isAscending, setIsAscending] = useState(true)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogMove, setDialogMove] = useState({})

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

  const handleMoveClick = (move) => {
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
          <div className="w-full border border-green-500 bg-black/20 flex justify-around items-center p-2">
            <section className="flex flex-col items-center justify-center">
              <p className="font-bold">Power</p>
              {dialogMove.power || '--'}
            </section>
            <section className="flex flex-col items-center justify-center">
              <p className="font-bold">Accuracy</p>
              {dialogMove.accuracy || '--'}
            </section>
            <section className="flex flex-col items-center justify-center">
              <p className="font-bold">PP</p>
              {dialogMove.pp || '--'}
            </section>
            <section className="flex flex-col items-center justify-center">
              <p className="font-bold">Damage</p>
              <DamageBadge dmgClass={dialogMove.dmgClass || '--'} />
            </section>
            <section className="flex flex-col items-center justify-center">
              <p className="font-bold">Type</p>
              <TypeBadge type={dialogMove.type || '--'} />
            </section>
          </div>
          <div className="w-full flex">
            <div className="border border-red-500 w-1/3 h-24">
              x2.0:
              <br />
              x0.5:
              <br />
              x0.0
            </div>
            <div className="border border-blue-500 w-2/3 h-24">
              {
                <>
                  <p>{dialogMove?.description || '--'}</p>
                  <p>{dialogMove.flavorTextEntries ? dialogMove.flavorTextEntries[0].flavorText : '--'}</p>
                </>
              }
            </div>
          </div>
          <div className="w-full border border-green-500 bg-black/20 flex justify-around items-center p-2">
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
        <MT.DialogFooter className={modalStyle.footer}></MT.DialogFooter>
      </MT.Dialog>
    </>
  )

}

export default Moves;