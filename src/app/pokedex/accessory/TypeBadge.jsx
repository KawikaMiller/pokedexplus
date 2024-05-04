import React from "react";

function TypeBadge(props){

  return(
    <div 
      className={`bg-${props.type} 
      flex justify-center items-center 
      ${props.size ? `w-${props.size} h-${props.size}` : `w-8 h-8`} 
      mx-0.5 p-0.5 xl:p-1 rounded-full relative text-white`}
    >
      <img src={`/${props.type}.svg`} className={'h-[70%] w-[70%]'}/>
      <div style={{display: props.effectiveness ? 'block' : 'none'}} className="absolute bottom-4 left-8 text-sm">
        <div className={props.effectiveness === 4 ? `fa-solid fa-angles-down` : props.effectiveness === 2 ? 'fa-solid fa-angle-down' : props.effectiveness === 0.25 ? 'fa-solid fa-angle-up' : 'fa-solid fa-angles-up'}></div>
      </div>
    </div>
  )

}

export default TypeBadge;