import React from "react";

function TypeBadge(props){

  return(
    <div className={`bg-${props.type} flex justify-center items-center w-6 h-6 sm:w-10 sm:h-10 mx-0.25 p-0.5 lg:p-1 rounded-3xl relative`}>
      <img src={`/${props.type}.svg`} className="w-3 h-3 sm:w-5 sm:h-5"/>
      <p style={{display: props.effectiveness ? 'block' : 'none'}} className="absolute bottom-2 left-6 text-sm">
        {
          props.effectiveness === 0.25 ? `¼`
          :
          props.effectiveness === 0.5 ? `½`
          :
          props.effectiveness
        }
      </p>
    </div>
  )

}

export default TypeBadge;