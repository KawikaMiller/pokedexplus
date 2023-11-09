import React from "react";

function TypeBadge(props){

  return(
    <div className={`bg-${props.type} flex justify-center w-6 sm:w-8 h-6 sm:h-8 py-1 lg:p-2 lg:w-full rounded-3xl`}>
      {/* <p className="hidden lg:visible">{`${props.type}`}</p> */}
      <img src={`/${props.type}.svg`} width={25} height={25}/>
    </div>
  )

}

export default TypeBadge;