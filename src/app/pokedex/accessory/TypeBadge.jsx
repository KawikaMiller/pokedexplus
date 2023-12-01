import React from "react";

function TypeBadge(props){

  return(
    <div className={`bg-${props.type} flex justify-center items-center w-12 h-5 sm:w-auto sm:h-10 p-0.5 lg:p-1 rounded-3xl`}>
      <img src={`/${props.type}.svg`} width={15} height={15}/>
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