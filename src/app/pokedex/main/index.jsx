import React from "react";
import MoveRow from "../right/moves/MoveRow";
import MoveRowSort from "../right/moves/MoveRowSort";
import MoveTabs from "../right/moves/MoveTabs";
import MoveDetails from "../right/moves/MoveDetails";
import LeftSide from "../left";

function MyMain (props) {

  return(
    <>
    {/* <div>Searchbar</div> */}
    <div id='my-main' className="flex flex-col lg:flex-row justify-center p-2 lg:h-[97vh] place-content-center lg:w-[90%]">
      <LeftSide />

      <div id='right-side' className="lg:w-1/2 h-auto bg-pkRed border-solid border-2 border-red-50">

        <div id='moves-container' className="h-full flex flex-col justify-center p-2">

          <div id='moves-header' className="h-fit">
            <MoveTabs />
            
          </div>

          <div id='moves-list' className="h-4/5 w-full my-2 mx-0">
            <MoveRowSort />
            <MoveRow />
          </div>
            <MoveDetails />
        </div>

      </div>
    </div>
    </>
  )

}

export default MyMain;