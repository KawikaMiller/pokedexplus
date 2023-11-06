import React from "react";
import MoveRow from "../right/moves/MoveRow";
import MoveRowSort from "../right/moves/MoveRowSort";
import MoveTabs from "../right/moves/MoveTabs";
import MoveDetails from "../right/moves/MoveDetails";
import LeftSide from "../left";

function MyMain (props) {

  return(
    <div id='my-main' style={{overflowY:'scroll'}}>

      <LeftSide />

      <div id='right-side' style={{border: '1px solid blue', flexGrow: '1'}}>
        <div id='moves-container' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'space-between', border: '1px solid black', padding: '0.5rem', height: '100%'}}>
          <div id='moves-header'>
            <MoveTabs />
            <MoveRowSort />
          </div>
          <div id='moves-list' style={{flexGrow: '4', border: '1px solid red', height: '500px', width: '100%', margin: '0.5rem 0'}}>
            
            <MoveRow />
          </div>
            <MoveDetails />
        </div>
      </div>
    </div>
  )

}

export default MyMain;