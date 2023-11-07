import React from "react";

function MoveRowSort() {

  return(
    <div className="move-row sort">
      <div className="move-num"><button className='move-sort'>Level</button></div>
      <div className="move-str"><button className='move-sort'>Name</button></div>
      <div className="move-num"><button className='move-sort'>Power</button></div>
      <div className="move-num"><button className='move-sort'>Accuracy</button></div>
      <div className="move-num"><button className='move-sort'>PP</button></div>
      <div className="move-img"><button className='move-sort'>Damage</button></div>
      <div className="move-img"><button className='move-sort'>Type</button></div>
    </div>
  )

}

export default MoveRowSort;