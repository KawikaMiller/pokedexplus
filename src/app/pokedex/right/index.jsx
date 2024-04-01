import React, { useState } from "react";
import { useSelector } from "react-redux";
import { cardStyle } from "../styles/tailwindClasses";
import Moves from "./moves/index.jsx";
import TeamBuilder from "./teamBuilder";

function RightSide(props) {

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
              <div key={tab.label} className={(idx === 0 ? tabStyle.first : idx === headerTabs.length - 1 ? tabStyle.last : tabStyle.middle) + ' right-header-tab'} onClick={(e) => handleActiveTab(e, idx)} >{tab.label}</div>
            ))
          }
        </div>
      </div>

      <div id="right-body" className={`${cardStyle.body.container}`}>

        {
          activeTab === 0 ?
            <Moves />
          :
          activeTab === 1 ?
           <TeamBuilder />
          :
          <div>oopsie</div>
        }

      </div>



    </div>
  )

}

export default RightSide;