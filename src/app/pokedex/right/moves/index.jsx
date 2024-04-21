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
import MoveDetails from "./MoveDetails";

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
  const [sortMovesBy, setSortMovesBy] = useState('levelLearned');
  const [movesKey, setMovesKey] = useState('levelLearned');
  const [activeVersion, setActiveVersion] = useState('yellow');

  const pokeState = useSelector(state => state.pokemon);

  const button = 'h-full w-full rounded-md bg-blue-500 px-0.5';
  const row = "text-center align-middle py-1 px-0 overflow-x-hidden flex items-center justify-between"
  const numAndImg = 'max-w-[17%] sm:max-w-[10%] grow-[0.5] mx-0.5'
  const str = 'max-w-[25%] sm:max-w-[30%] grow-[1] mx-0.5'

  let gensWithMoves = {
    // 'red-blue': false,
    yellow: false,
    // 'gold-silver': false,
    crystal: false,
    // 'ruby-sapphire': false,
    emerald: false,
    'firered-leafgreen': false,
    colosseum: false,
    xd: false,
    // 'diamond-pearl': false,
    platinum: false,
    'heartgold-soulsilver': false,
    // 'black-white': false,
    'black-2-white-2': false,
    'x-y': false,
    'omega-ruby-alpha-sapphire': false,
    // 'sun-moon': false,
    'ultra-sun-ultra-moon': false,
    'lets-go-pikachu-lets-go-eevee': false,
    'sword-shield': false,
    'brilliant-diamond-and-shining-pearl': false,
    'legends-arceus': false,
    'scarlet-violet': false,
  }

  // gets all of the moves that a pokemon has in any given version/generation of the pokemon games
  const parseMovesByGeneration = (version) => {
    let levelArr = [];
    let tmArr = [];
    let tutorArr = [];
    let eggArr = [];

    // iterate through all of current pokemons moves
    pokeState.pokemon?.moves.forEach(move => {
      // check each move's `versionDetails` which is an array of objects, each object lets us know info about that move in the various generations the pokemon was in
      // e.g. "in red/blue/yellow the move is learned at level 10 but in crystal it's learned at level 13" OR "in crystal it was learned by leveling up but in black/white it can only be learned by TM", etc
      move.versionDetails.forEach(details => {
        // details.version lets us know which exact version of the pokemon games this move exists in, therefore we know that the pokemon exists within that generation/version
        // if the corresponding value in `gensWithMoves` is false, we need to set it to true so that we know which generations/versions to include when we allow the user to filter moves by generation/version (e.g. if the user is playing Pokemon HeartGold/SoulSilver then they need to ONLY see the moves that the pokemon can learn in HGSS)
        if (!gensWithMoves[details.version]) {
          gensWithMoves[details.version] = true;
        };

        // here we are matching the moves with the version we are parsing for (e.g. get all the move data for HGSS) and separate them by their learn method
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

    // we take the parsed moves and set them in state so that we can trigger a re-render and display the correct moves for the correct generation
    setLevelMoves(levelArr);
    setTmMoves(tmArr);
    setTutorMoves(tutorArr);
    setEggMoves(eggArr);
  }

  // runs when the 'movesKey' state is changed. `movesKey` dictates what moves we render (e.g. 'level', 'machine', 'tutor', 'egg')
  const updateActiveMoves = () => {
    switch (movesKey) {
      case 'levelLearned':
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

  // sorts moves by any given property (e.g. sort by level learned, name, power, accuracy etc)
  // can sort by ascending/descending
  const sortMoves = (property) => {
    console.log(property, typeof property)
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
      
      setSortMovesBy(property)
      setIsAscending(!isAscending)
      setActiveMoves(temp)
    }
  }

  // gets type effectiveness of move when we click/tap on a move and display the MoveDetails dialog/modal
  const handleMoveClick = async (move) => {
    await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/type/${move.type}`).then(res => setDialogMoveTyping(res.data))
    setDialogMove(move);
    setShowDialog(true);
  }

  // parses moves and sorts them by learn method depending on what generation of moves we want to see (e.g. will only show moves from gen 2 and separates the level, machine, egg, tutor moves for that generation)
  useEffect(() => {
    parseMovesByGeneration(activeVersion);
    setGenerationMoves(gensWithMoves);
  }, [activeVersion]) 

  // clean this up later so that the code is dry, currently this is reusing logic form 'parseMovesByGeneration()'
  useEffect(() => {
    pokeState.pokemon?.moves.forEach(move => {

      move.versionDetails.forEach(details => {

        if (!gensWithMoves[details.version]) {
          gensWithMoves[details.version] = true;
        };

      })
    })

    let mostRecentGameAppearance = Object.keys(gensWithMoves).reverse().find(key => gensWithMoves[key] === true)
    setActiveVersion(mostRecentGameAppearance)
  }, [pokeState.pokemon]) 

  // allows moves to initially render after moves have been parsed for the first time
  useEffect(() => {
    let temp = [...levelMoves];
    temp.sort((a, b) => (
      a.levelLearned === b.levelLearned ? 0 : a.levelLearned < b.levelLearned ? -1 : 1
    ))
    setActiveMoves(temp);
    setSortMovesBy('levelLearned');
    setMovesKey('levelLearned')
  }, [levelMoves])

  // updates rendered moves whenever a move tab is clicked (i.e. level, machine, egg, tutor)
  useEffect(() => {
    updateActiveMoves();
  }, [movesKey]) 

  // useEffect(() => { console.log(activeVersion) }, [activeVersion])

  return (
    <>
      <div id='right-body-top'>
        <div id='move-tabs-container' className="mx-2 mt-2 bg-blue-800 rounded-t-md">
          <MoveTabs key={'move-tabs'} generationMoves={generationMoves} setActiveVersion={setActiveVersion} setMovesKey={setMovesKey} activeVersion={activeVersion}/>
        </div>
      </div>

      <div className=" overflow-y-auto min-h-0 h-full bg-black/50 mx-2">
        <div className="sticky top-0 z-[100] bg-blue-800 border-t px-0.5 py-1">
          <MoveRowSort css={{ button, row, numAndImg, str }} sortMoves={sortMoves} sortMovesBy={sortMovesBy} isAscending={isAscending} movesKey={movesKey}/>
        </div>
        {
          activeMoves?.length ?
            activeMoves.map((move, idx) => {
              return <MoveRow css={{ button, row, numAndImg, str }} move={move} alt={idx % 2 ? `bg-black/25` : `bg-black/40`} movesKey={movesKey} sortMovesBy={sortMovesBy} key={move.name + move.levelLearned} activeVersion={activeVersion} handleClick={() => handleMoveClick(move)} />
            })
            :
            <div className="text-center">missingMoveData</div>
        }
      </div>

      <MoveDetails dialogMove={dialogMove} dialogMoveTyping={dialogMoveTyping} showDialog={showDialog} setShowDialog={setShowDialog} />

    </>
  )

}

export default Moves;