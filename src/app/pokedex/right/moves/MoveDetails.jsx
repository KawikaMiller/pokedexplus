import React from "react";

function MoveDetails() {

  return(
    <div id='moves-details' className="h-2/5" style={{flexGrow: '1', border: '1px solid red', height: '150px', width: '100%'}}>

      <div id='selected-move-name' style={{height: '25%', padding: '0 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <h2 style={{fontSize: '1.5rem', fontWeight: '700', verticalAlign: 'middle'}}>Solar Beam</h2>
        <h3>Power</h3>
        <h3>Accuracy</h3>
        <h3>PP</h3>
        <h3>Damage</h3>
        <h3>Type</h3>
      </div>

      <div style={{display: 'flex', height: '75%'}}>
        <div id='move-type-effectiveness' style={{border: '1px solid red', flexGrow: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0.5rem'}}>
          <div id='selected-move-strong-against' style={{verticalAlign: 'middle', border: '1px solid magenta', height: '33%'}}>
            Strong Against: 
          </div>
          <div id='selected-move-weak-against' style={{verticalAlign: 'middle', border: '1px solid green', height: '33%'}}>
            Weak Against: 
          </div>
        </div>

        <div id='move-description' style={{border: '1px solid white', flexGrow: '0.75', overflow: 'hidden', width: '40%'}}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla in, vitae soluta eum itaque velit aspernatur eos deleniti veniam exercitationem illum, blanditiis, qui et fugiat. Praesentium optio sit amet voluptas aspernatur possimus iste eaque! Vitae omnis, quas hic velit impedit sapiente ipsum exercitationem eligendi quisquam magni similique itaque odit quibusdam!
        </div>
      </div>

    </div>
  )

}

export default MoveDetails;