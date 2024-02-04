import React from "react";

function DamageBadge(props){

  return(
    <div className={`bg-${props.dmgClass}BG flex justify-center items-center w-full h-auto sm:w-10 sm:h-6 mx-1 p-0.5 lg:p-1 rounded-3xl`}>
      <img src={`/${props.dmgClass}.svg`} className="w-3 h-3 sm:w-5 sm:h-5"/>
    </div>
  )

}

export default DamageBadge;