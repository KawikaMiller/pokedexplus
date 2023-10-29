import React from "react";

function MoveRowSort() {

  return(
    <div className="move-row sort">
      <div className="move-num"><button class='move-sort'>Level</button></div>
      <div className="move-str"><button class='move-sort'>Name</button></div>
      <div className="move-num"><button class='move-sort'>Power</button></div>
      <div className="move-num"><button class='move-sort'>Accuracy</button></div>
      <div className="move-num"><button class='move-sort'>PP</button></div>
      <div className="move-img"><button class='move-sort'>Damage</button></div>
      <div className="move-img"><button class='move-sort'>Type</button></div>
    </div>
  )

}

export default MoveRowSort;