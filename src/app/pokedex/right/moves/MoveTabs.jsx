import React from 'react';
import MT from '@/app/lib/clientmaterialtailwind';

function MoveTabs(props) {

  return(
    <div id='moves-header' className="h-fit w-full flex justify-between">
      <div className='flex'>
        <div className='p-2 bg-blue-600 border-blue-700 border-[1px] rounded-tl-md' onClick={() => props.setMovesKey('level')}>Lvl</div>
        <div className='p-2 bg-blue-600 border-blue-700 border-[1px]' onClick={() => props.setMovesKey('machine')}>Machine</div>
        <div className='p-2 bg-blue-600 border-blue-700 border-[1px]' onClick={() => props.setMovesKey('egg')}>Egg</div>
        <div className='p-2 bg-blue-600 border-blue-700 border-[1px] rounded-tr-md' onClick={() => props.setMovesKey('tutor')}>Tutor</div>
      </div>


      <MT.Menu>
        <MT.MenuHandler>
          <div className='p-2 rounded-t-md bg-blue-600 border-blue-700 border-[1px] '>Gen I</div>
        </MT.MenuHandler>
        <MT.MenuList>
          <MT.MenuItem>Red/Blue</MT.MenuItem>
          <MT.MenuItem>Yellow</MT.MenuItem>
          <MT.MenuItem>Gold/Silver</MT.MenuItem>
          <MT.MenuItem>Crystal</MT.MenuItem>
        </MT.MenuList>
      </MT.Menu>
    </div>
  )

}

export default MoveTabs;