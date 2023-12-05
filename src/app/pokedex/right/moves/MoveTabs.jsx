import React from 'react';

function MoveTabs(props) {

  return(
    <div id='moves-header' className="h-fit w-full flex justify-end">
      <div className='py-2 px-4 bg-blue-600 border-blue-700 border-[1px] rounded-tl-md'>Lvl</div>
      <div className='py-2 px-4 bg-blue-600 border-blue-700 border-[1px] '>Machine</div>
      <div className='py-2 px-4 bg-blue-600 border-blue-700 border-[1px] '>Egg</div>
      <div className='py-2 px-4 bg-blue-600 border-blue-700 border-[1px] '>Tutor</div>
      <div className='py-2 px-4 bg-blue-600 border-blue-700 border-[1px] rounded-tr-md'>Gen</div>
    </div>
  )

}

export default MoveTabs;