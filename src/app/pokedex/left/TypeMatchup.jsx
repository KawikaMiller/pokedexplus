import React, { useState, useEffect } from "react";
import TypeBadge from "../accessory/TypeBadge";

import { determineTypeEffectiveness } from "@/app/lib/helpers";

import { useSelector } from "react-redux";

function TypeMatchup() {
  const pokeState = useSelector(state => state.pokemon);
  const [typeEffectiveness, setTypeEffectiveness] = useState([]);

  useEffect(() => {
    if (pokeState.pokemon?.types) {
      setTypeEffectiveness([]);
      setTypeEffectiveness(determineTypeEffectiveness(pokeState.pokemon.types))
    }
  }, [pokeState.pokemon])

  return (

    <div id='pokemon-type-matchup' className="w-2/3 mr-1 flex flex-col justify-evenly bg-transparent/50">

      <section className="flex h-full">
        <h4 className="w-1/3">Weak To: </h4>
        <div className="bg-transparent/25 w-2/3 flex items-center overflow-x-auto">
          {
            typeEffectiveness.map(element => {
              if (element.effectiveness > 1) {
                return <div className="mr-3"><TypeBadge type={element.type} effectiveness={element.effectiveness} /></div>
              } else return null;
            })
          }
        </div>
      </section>

      <section className="flex h-full my-1">
        <h4 className="w-1/3">Resistant To: </h4>
        <div className="bg-transparent/50 w-2/3 flex items-center overflow-x-auto">
          {
            typeEffectiveness.map(element => {
              if (element.effectiveness < 1 && element.effectiveness > 0) {
                return <div className="mr-3"><TypeBadge type={element.type} effectiveness={element.effectiveness} /></div>
              } else return null;
            })
          }
        </div>
      </section>

      <section className="flex h-full">
        <h4 className="w-1/3">Immune To: </h4>
        <div className="bg-transparent/25 w-2/3 flex flex-wrap items-center overflow-x-auto">
        {
            typeEffectiveness.map(element => {
              if(element.effectiveness === 0){
                return <div className="mr-3"><TypeBadge type={element.type} effectiveness={element.effectiveness}/></div>
              } else return null;
            })
          }
        </div>
      </section>
    </div>
  )

}

export default TypeMatchup;