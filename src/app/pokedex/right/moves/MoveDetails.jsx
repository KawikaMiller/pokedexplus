import React from "react";

function MoveDetails() {

  return(
    <div id='moves-details' style={{flexGrow: '1', border: '1px solid red', height: '150px', width: '100%', display: 'flex'}}>
      
      <div id='move-type-effectiveness' style={{border: '1px solid red', flexGrow: '1'}}>
        <div id='selected-move-name'>
          Solar-Beam
        </div>
        <div id='selected-move-strong-against'>
          Strong Against: 
        </div>
        <div id='selected-move-weak-against'>
          Weak Against: 
        </div>
      </div>

      <div id='move-description' style={{border: '1px solid white', flexGrow: '2'}}>
      </div>

    </div>
  )

}

export default MoveDetails;