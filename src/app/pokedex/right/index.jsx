import React, { useState, useEffect } from "react";

import MoveRow from "./moves/MoveRow";
import MoveRowSort from "./moves/MoveRowSort";
import MoveTabs from "./moves/MoveTabs";
import MoveDetails from "./moves/MoveDetails";

import { useDispatch, useSelector } from "react-redux";
import pokeSlice from "@/app/reduxStore/pokeSlice";
import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";
import { cardStyle } from "../styles/tailwindClasses";
import MT from "@/app/lib/clientmaterialtailwind";

function RightSide(props) {
  const [levelMoves, setLevelMoves] = useState([]);
  const [tmMoves, setTmMoves] = useState([]);
  const [tutorMoves, setTutorMoves] = useState([]);
  const [eggMoves, setEggMoves] = useState([]);
  const [activeMoves, setActiveMoves] = useState(undefined);
  const [generationMoves, setGenerationMoves] = useState({});
  const [isAscending, setIsAscending] = useState(true)
  const [showMoveModal, setShowMoveModal] = useState(false)
  const [moveModalData, setMoveModalData] = useState(undefined)

  const [movesKey, setMovesKey] = useState('level');
  const [activeVersion, setActiveVersion] = useState('black-2-white-2');

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

        if (!hasMoves[details.version]) {
          hasMoves[details.version] = true;
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
    console.log('sort moves hit', activeMoves)
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

  // parses moves and sorts them by learn method depending on what generation of moves we want to see (e.g. will only show moves from gen 2 and separates the level, machine, egg, tutor moves for that generation)
  useEffect(() => {
    parseMovesByGeneration(activeVersion);
    setGenerationMoves(hasMoves);
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

  const rightSideStyle = `rounded-b-md lg:rounded-r-md lg:rounded-bl-none z-10`

  const headerTabs = [
    {
      label: 'Moves',
      value: 'moves'
    },
    {
      label: 'Team Builder',
      value: 'team builder'
    }
  ]

  return (
    <div id='right-side' className={`${rightSideStyle} ${cardStyle.main}`}>

      <div id="right-header" className={`${cardStyle.header}`}>
        <MT.Tabs value='moves' className='w-full'>
          <MT.TabsHeader className="bg-blue-800/100" indicatorProps={{ className: 'bg-blue-500' }}>
            {headerTabs.map(({ label, value }) => <MT.Tab className="text-sm text-white" key={value} value={value}>{label}</MT.Tab>)}
          </MT.TabsHeader>
        </MT.Tabs>
      </div>

      <div id="right-body" className={`${cardStyle.body.container}`}>
        <div id='right-body-top'>
          <div id='move-tabs-container' className="mx-2 mt-2 border">
            <MoveTabs setMovesKey={setMovesKey} />
          </div>
        </div>

        <div className=" overflow-y-auto min-h-0 h-full bg-black/50  border mx-2">
          <div className="sticky top-0 z-[100] bg-black">
            <MoveRowSort css={{ button, row, numAndImg, str }} sortMoves={sortMoves} isAscending={isAscending} />
          </div>
          {
            activeMoves?.length ?
              activeMoves.map((move, idx) => {
                return <MoveRow css={{ button, row, numAndImg, str }} move={move} alt={idx % 2 ? `bg-black/25` : `bg-black/40`} movesKey={movesKey} key={move.name + move.levelLearned} activeVersion={activeVersion} toggleDetails={() => setShowMoveModal(!showMoveModal)} setMoveModalData={setMoveModalData} />
              })
              :
              <div className="text-center">missingMoveData</div>
          }
        </div>

      </div>



    </div>
  )

}

export default RightSide;

// (<div id='moves-container' className="h-full flex flex-col justify-start">

// <MoveTabs setMovesKey={setMovesKey} />

// <div id='moves-list' className="min-h-0 h-full w-full mx-0  flex flex-col justify-start">

//   <MoveRowSort css={{ button, row, numAndImg, str }} sortMoves={sortMoves} isAscending={isAscending} />

//   <div className=" overflow-y-auto min-h-[inherit] h-full bg-black/50 rounded-md">

//     {
//       activeMoves?.length ?
//         activeMoves.map((move, idx) => {
//           return <MoveRow css={{ button, row, numAndImg, str }} move={move} alt={idx % 2 ? `bg-black/25` : `bg-black/40`} movesKey={movesKey} key={move.name + move.levelLearned} activeVersion={activeVersion} toggleDetails={() => setShowMoveModal(!showMoveModal)} setMoveModalData={setMoveModalData} />
//         })
//         :
//         <div className="text-center">missingMoveData</div>
//     }
//   </div>

// </div>
// {/* <MoveDetails showMoveModal={showMoveModal} setShowMoveModal={setShowMoveModal} move={moveModalData}/> */}
// </div>)