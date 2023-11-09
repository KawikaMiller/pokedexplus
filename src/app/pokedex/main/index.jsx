import React from "react";
import MoveRow from "../right/moves/MoveRow";
import MoveRowSort from "../right/moves/MoveRowSort";
import MoveTabs from "../right/moves/MoveTabs";
import MoveDetails from "../right/moves/MoveDetails";
import LeftSide from "../left";

function MyMain (props) {

  return(
    <>
    <header>HEADER</header>
    <div>Searchbar</div>
    <div id='my-main' className="flex flex-col lg:flex-row justify-center p-2 lg:h-screen place-content-center bg-slate-800">
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
    <footer>FOOTER</footer>
    </>
  )

}

export default MyMain;