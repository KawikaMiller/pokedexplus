import React from "react";

function DamageBadge(props){

  return(
    <div className={
      `bg-${props.dmgClass}BG
      flex justify-center items-center
      ${props.size ? `w-${props.size} h-${props.size}` : `w-8 h-8`}  
      mx-0.5 p-0.5 lg:p-1 rounded-full relative text-white`
    }>
      <img src={`/${props.dmgClass}.svg`} className="w-3/4 h-3/4'"/>
    </div>
  )

}

export default DamageBadge;