import React from "react";

function TypeBadge(props){

  return(
    <div className={`bg-${props.type}`}>
      {`${props.type}`}
    </div>
  )

}

export default TypeBadge;