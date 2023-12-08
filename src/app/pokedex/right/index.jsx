import React, { useState, useEffect } from "react";

import MoveRow from "./moves/MoveRow";
import MoveRowSort from "./moves/MoveRowSort";
import MoveTabs from "./moves/MoveTabs";
import MoveDetails from "./moves/MoveDetails";

import { useDispatch, useSelector } from "react-redux";
import pokeSlice from "@/app/reduxStore/pokeSlice";

function RightSide(props) {
  const [levelMoves, setLevelMoves] = useState([]);
  const [tmMoves, setTmMoves] = useState([]);
  const [tutorMoves, setTutorMoves] = useState([]);
  const [eggMoves, setEggMoves] = useState([]);
  const [activeMoves, setActiveMoves] = useState(undefined);
  const [generationMoves, setGenerationMoves] = useState({});

  const [movesKey, setMovesKey] = useState('level');
  const [activeGeneration, setActiveGeneration] = useState('yellow');

  const pokeState = useSelector(state => state.pokemon);
  // const dexState = useSelector(state => state.pokedex);
  // const settingsState = useSelector(state => state.settings);

  const button = 'h-full w-full rounded-md bg-blue-500 mx-[0.125rem]';
  const row = "text-center align-middle py-1 px-0 overflow-x-hidden flex items-center justify-between"
  const numAndImg = 'max-w-[13%] md:max-w-[10%] grow-[0.5]'
  const str = 'max-w-[22%] md:max-w-[40%] grow-[1]'

  let hasMoves = {
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
        
        if(!hasMoves[details.version]){
          hasMoves[details.version] = true;
        };


        if (details.version === version) {
          let nMove = {...move};
          nMove.learnMethod = details.learnMethod;
          nMove.levelLearned = details.levelLearned;
          switch(details.learnMethod){
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
    console.log('active moves updating')
    switch(movesKey){
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

  // parses moves and sorts them by learn method depending on what generation of moves we want to see (e.g. will only show moves from gen 2 and separates the level, machine, egg, tutor moves for that generation)
  useEffect(() => {
    parseMovesByGeneration(activeGeneration);
    setGenerationMoves(hasMoves);
  }, [pokeState.pokemon, activeGeneration]) //eslint-disable-line

  // allows moves to initially render after moves have been parsed for the first time
  useEffect(() => {
    setMovesKey('level');
    setActiveMoves(levelMoves)
  }, [levelMoves])

  // updates rendered moves whenever a move tab is clicked (i.e. level, machine, egg, tutor)
  useEffect(() => {
    updateActiveMoves();
  }, [movesKey]) //eslint-disable-line

  return (
    <div id='right-side' className="lg:w-1/2 h-auto bg-pkRed rounded-b-md lg:rounded-r-md lg:rounded-bl-none z-10">

      <div id='moves-container' className="h-full flex flex-col justify-start p-2">

        <MoveTabs setMovesKey={setMovesKey}/>

        <div id='moves-list' className="min-h-0 w-full mx-0  flex flex-col justify-start">

          <MoveRowSort css={{button, row, numAndImg, str}} />

          <div className=" overflow-y-scroll min-h-[inherit]">
            
            {
              activeMoves?.length ? activeMoves.map((move, idx) => {
                return <MoveRow css={{ button, row, numAndImg, str }} move={move} alt={idx % 2 ? `bg-black/50` : `bg-black/60`} movesKey={movesKey} key={move.name}/>
              })
              :
              <p>NO VALID MOVES FOR THIS CATEGORY</p>
            }
          </div>

        </div>
        {/* <MoveDetails /> */}
      </div>

    </div>
  )

}

export default RightSide;