import React from "react";

function TypeBadge(props){

  return(
    <div className={`bg-${props.type} flex justify-center w-8 h-8 sm:w-10 sm:h-10 p-2 lg:p-1 rounded-3xl`}>
      {/* <p className="hidden lg:visible">{`${props.type}`}</p> */}
      <img src={`/${props.type}.svg`} width={25} height={25}/>
    </div>
  )

}

export default TypeBadge;