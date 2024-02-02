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
import Moves from "./moves/index.jsx";

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
  const [activeTab, setActiveTab] = useState(0);

  const pokeState = useSelector(state => state.pokemon);
  // const dexState = useSelector(state => state.pokedex);
  // const settingsState = useSelector(state => state.settings);

  const handleActiveTab = (e, idx) => {
    let tabs = document.getElementsByClassName('right-header-tab');

    for(let i = 0; i < tabs.length; i++){
      tabs[i].className = tabs[i].className.replace('bg-blue-500', 'bg-blue-800')
    }

    e.target.className = e.target.className.replace('bg-blue-800', 'bg-blue-500')
    setActiveTab(idx)
  }

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

  const tabStyle = {
    first: 'flex grow justify-center items-center bg-blue-500 border-blue-700 border-[1px] rounded-tl-md',
    middle: 'flex grow justify-center items-center bg-blue-800 border-blue-700 border-[1px]',
    last: 'flex grow justify-center items-center bg-blue-800 border-blue-700 border-[1px] rounded-tr-md',
  }

  return (
    <div id='right-side' className={`${rightSideStyle} ${cardStyle.main}`}>

      <div id="right-header" className={`${cardStyle.header}`}>
        <div id='right-header-tabs-container' className='flex w-full justify-stretch'>
          {
            headerTabs.map((tab, idx) => (
              <div className={(idx === 0 ? tabStyle.first : idx === headerTabs.length - 1 ? tabStyle.last : tabStyle.middle) + ' right-header-tab'} onClick={(e) => handleActiveTab(e, idx)} >{tab.label}</div>
            ))
          }
        </div>
      </div>

      <div id="right-body" className={`${cardStyle.body.container}`}>
        {/* <div id='right-body-top'>
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
                return <MoveRow css={{ button, row, numAndImg, str }} move={move} alt={idx % 2 ? `bg-black/25` : `bg-black/40`} movesKey={movesKey} key={move.name + move.levelLearned} activeVersion={activeVersion} toggleDetails={() => setShowMoveModal(!showMoveModal)} setMoveModalData={setMoveModalData} />
              })
              :
              <div className="text-center">missingMoveData</div>
          }
        </div> */}

        {
          activeTab === 0 ?
            <Moves />
          :
          activeTab === 1 ?
            <div>TEAMBUILDER</div>
          :
          <div>oopsie</div>
        }

      </div>



    </div>
  )

}

export default RightSide;