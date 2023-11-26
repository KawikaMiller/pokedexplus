import React, { useState, useEffect } from "react";

import MoveRow from "./moves/MoveRow";
import MoveRowSort from "./moves/MoveRowSort";
import MoveTabs from "./moves/MoveTabs";
import MoveDetails from "./moves/MoveDetails";

import { useDispatch, useSelector } from "react-redux";
import pokeSlice from "@/app/reduxStore/pokeSlice";

function RightSide(props) {
  const [levelUpMoves, setLevelUpMoves] = useState([]);
  const [tmMoves, setTmMoves] = useState([]);
  const [tutorMoves, setTutorMoves] = useState([]);
  const [eggMoves, setEggMoves] = useState([]);
  const [generationMoves, setGenerationMoves] = useState({});

  const [activeKey, setActiveKey] = useState(0);
  const [activeGeneration, setActiveGeneration] = useState('yellow');

  const pokeState = useSelector(state => state.pokemon);
  // const dexState = useSelector(state => state.pokedex);
  // const settingsState = useSelector(state => state.settings);

  const button = 'h-full w-full rounded-md bg-blue-500 mx-[0.125rem]';
  const row = "text-center align-middle py-1 px-0 overflow-x-hidden flex items-center justify-between"
  const numAndImg = 'max-w-[10%] grow-[0.5]'
  const str = 'max-w-[40%] grow-[1]'

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

    setLevelUpMoves(levelArr);
    setTmMoves(tmArr);
    setTutorMoves(tutorArr);
    setEggMoves(eggArr);
  }

  useEffect(() => {
    parseMovesByGeneration(activeGeneration);
    setGenerationMoves(hasMoves)
  }, [pokeState.pokemon, activeGeneration]) //eslint-disable-line

  return (
    <div id='right-side' className="lg:w-1/2 h-auto bg-pkRed rounded-b-md lg:rounded-r-md lg:rounded-bl-none z-10">

      <div id='moves-container' className="h-full  flex flex-col justify-start p-2">

        <MoveTabs />

        <div id='moves-list' className="min-h-0 w-full mx-0  flex flex-col justify-start">

          <MoveRowSort css={{button, row, numAndImg, str}}/>

          <div className=" overflow-y-scroll">
            {
              pokeState?.pokemon?.moves.map((move, idx) => {
                return <MoveRow css={{ button, row, numAndImg, str }} move={move} alt={idx % 2 ? `bg-black/50` : `bg-black/60`} />
              })
            }
          </div>

        </div>
        {/* <MoveDetails /> */}
      </div>

    </div>
  )

}

export default RightSide;