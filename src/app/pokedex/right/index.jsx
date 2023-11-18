import React from "react";

import MoveRow from "./moves/MoveRow";
import MoveRowSort from "./moves/MoveRowSort";
import MoveTabs from "./moves/MoveTabs";
import MoveDetails from "./moves/MoveDetails";

function RightSide(props) {

  const button = 'h-full w-full rounded-md bg-blue-500 mx-[0.125rem]';
  const row = "text-center align-middle py-1 px-0 overflow-x-hidden flex items-center justify-center"
  const numAndImg = 'max-w-[10%] grow-[0.5]'
  const str = 'max-w-[40%] grow-[1]'

  return (
    <div id='right-side' className="lg:w-1/2 h-auto bg-pkRed rounded-r-md z-10">

      <div id='moves-container' className="h-full flex flex-col justify-center p-2">

        <MoveTabs />

        <div id='moves-list' className="h-4/5 w-full my-2 mx-0">
          <MoveRowSort css={{button, row, numAndImg, str}}/>
          <MoveRow css={{button, row, numAndImg, str}}/>
        </div>
        <MoveDetails />
      </div>

    </div>
  )

}

export default RightSide;