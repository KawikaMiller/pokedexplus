import React from "react";

function TypeBadge(props){

  return(
    <div className={`bg-${props.type} flex justify-center items-center w-full h-auto sm:w-10 sm:h-6 mx-1 p-0.5 lg:p-1 rounded-3xl`}>
      <img src={`/${props.type}.svg`} className="w-3 h-3 sm:w-5 sm:h-5"/>
      <p style={{display: props.effectiveness ? 'block' : 'none'}} className="align-middle m-0 p-0">
        x{
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