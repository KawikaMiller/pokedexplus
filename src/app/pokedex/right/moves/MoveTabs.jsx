import React from 'react';
import MT from '@/app/lib/clientmaterialtailwind';
import { menu } from '@material-tailwind/react';

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


      {/* <MT.Menu>
        <MT.MenuHandler>
          <div className='p-2 flex justify-center items-center rounded-t-md bg-blue-600 border-blue-700 border-[1px] '>Gen I</div>
        </MT.MenuHandler>
        <MT.MenuList>
          <MT.MenuItem>Red/Blue</MT.MenuItem>
          <MT.MenuItem>Yellow</MT.MenuItem>
          <MT.MenuItem>Gold/Silver</MT.MenuItem>
          <MT.MenuItem>Crystal</MT.MenuItem>
        </MT.MenuList>
      </MT.Menu> */}
      {/* <div id='gen-select-container' className='z-[200] max-h-[36px] w-1/3'> */}
        {/* <MT.Select label='Generation' color='blue' size='md' className='max-h-[36px] text-white'
          labelProps={{ style: { color: 'white' } }}>
          <MT.Option>Red/Blue</MT.Option>
          <MT.Option>Yellow</MT.Option>
          <MT.Option>Gold/Silver</MT.Option>
          <MT.Option>Crystal</MT.Option>
        </MT.Select> */}
        <select className='w-1/3 rounded-md h-[36px] bg-blue-500 text-white ml-1'>
          <option>Gen 1</option>
          <option>Gen 2</option>
          <option>Gen 3</option>
          <option>Gen 4</option>
        </select>
      {/* </div> */}

    </div>
  )

}

export default MoveTabs;