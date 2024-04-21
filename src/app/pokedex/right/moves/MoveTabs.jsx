import React, { useState } from 'react';
import MT from '@/app/lib/clientmaterialtailwind';
import { modalStyle } from '../../styles/tailwindClasses';
import { removeHyphen, capitalizeWord, genLabels } from '@/app/lib/helpers';

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

      <MT.Button className='text-center align-middle flex justify-center items-center overflow-hidden w-1/4 max-w-1/4' size='sm' color='blue' onClick={() => setOpenDialog(true)}>
        {genLabels[props.activeVersion]}
      </MT.Button>

      <MT.Dialog open={openDialog} handler={() => setOpenDialog(!openDialog)}>
        <MT.DialogHeader className={modalStyle.header}>
          Gen. Select
          <MT.Button variant='outlined' color='white' onClick={() => setOpenDialog(!openDialog)}>X</MT.Button>
        </MT.DialogHeader>

        <MT.DialogBody className={`max-h-[500px] overflow-y-scroll flex flex-wrap justify-evenly bg-blue-gray-200 text-black [&>*]:m-0.5 `}>

          {

            Object.keys(props.generationMoves).map(key => (
              props.generationMoves[key] ?
                <button className='bg-blue-500 w-2/5 rounded-md text-white font-bold' size='sm' key={`gen-${key}`} value={key}
                  onClick={(e) => {
                    props.setActiveVersion(e.target.value);
                    setOpenDialog(false)
                  }}
                > 
                    {genLabels[key]}
                </button>
                :
                null
            ))

          }

        </MT.DialogBody>

        <MT.DialogFooter className={`${modalStyle.footer} text-white`}>
          FOOTER
        </MT.DialogFooter>
      </MT.Dialog>
    </div>
  )

}

export default MoveTabs;