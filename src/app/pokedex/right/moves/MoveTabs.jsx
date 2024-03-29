import React from 'react';
import MT from '@/app/lib/clientmaterialtailwind';
import { removeHyphen, capitalizeWord } from '@/app/lib/helpers';

function MoveTabs(props) {

  const moveTabs = [
    {
      label: 'Level',
      value: 'level'
    },
    {
      label: 'Machine',
      value: 'machine'
    },
    {
      label: 'Egg',
      value: 'egg',
    },
    {
      label: 'Tutor',
      value: 'tutor'
    }
  ]

  return (
    <div id='moves-header' className="w-full flex justify-between items-center py-1">
      <MT.Tabs value='level' className='grow w-full mr-1'>
        <MT.TabsHeader className="bg-blue-800/100" indicatorProps={{ className: 'bg-blue-500' }}>
          {moveTabs.map(({ label, value }) => <MT.Tab onClick={() => props.setMovesKey(value)} className="text-sm text-white" key={value} value={value}>{label}</MT.Tab>)}
        </MT.TabsHeader>
      </MT.Tabs>

        <select onChange={(e) => props.setActiveVersion(e.target.value)} className='w-1/3 rounded-md h-[36px] bg-blue-700 text-white ml-1 border border-white'>
          {Object.keys(props.generationMoves).map(key => (
            props.generationMoves[key] ? 
            <option value={key}>{capitalizeWord(removeHyphen(key))}</option> 
            : 
            null
          ))}
        </select>
    </div>
  )

}

export default MoveTabs;