import React, { useState } from 'react';
import MT from '@/app/lib/clientmaterialtailwind';
import { removeHyphen, capitalizeWord } from '@/app/lib/helpers';

function MoveTabs(props) {

  const moveTabs = [
    {
      label: 'Level',
      value: 'levelLearned'
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

  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div id='moves-header' className="w-full flex justify-between items-center py-1">
      <MT.Tabs value='levelLearned' className='grow w-full mr-1'>
        <MT.TabsHeader className="bg-blue-800/100" indicatorProps={{ className: 'bg-blue-500' }}>
          {moveTabs.map(({ label, value }) => <MT.Tab onClick={() => props.setMovesKey(value)} className="text-sm text-white" key={value} value={value}>{label}</MT.Tab>)}
        </MT.TabsHeader>
      </MT.Tabs>

      <MT.Button className='text-center align-middle flex justify-center items-center' size='sm' onClick={() => setOpenDialog(true)}>
        {props.activeVersion}
        {/* GEN */}
      </MT.Button>

      <MT.Dialog open={openDialog} handler={() => setOpenDialog(!openDialog)}>
        <MT.DialogHeader>GEN/VERSION SELECT</MT.DialogHeader>

        <MT.DialogBody className='flex-col flex-wrap justify-evenly [&>*]:m-0.5'>

          {

            Object.keys(props.generationMoves).map(key => (
              props.generationMoves[key] ?
                <MT.Button size='sm' key={`gen-${key}`} onClick={(e) => {
                  props.setActiveVersion(e.target.value);
                  setOpenDialog(false)
                }} value={key}>{capitalizeWord(removeHyphen(key))}</MT.Button>
                :
                null
            ))

          }

          {/* <select onChange={(e) => props.setActiveVersion(e.target.value)} className='w-1/3 rounded-md h-[36px] bg-blue-700 text-white ml-1 border border-white'>
            {Object.keys(props.generationMoves).map(key => (
              props.generationMoves[key] ?
                <option key={`gen-${key}`} value={key}>{capitalizeWord(removeHyphen(key))}</option>
                :
                null
            ))}
          </select> */}
        </MT.DialogBody>

        <MT.DialogFooter>
          FOOTER
        </MT.DialogFooter>
      </MT.Dialog>
    </div>
  )

}

export default MoveTabs;