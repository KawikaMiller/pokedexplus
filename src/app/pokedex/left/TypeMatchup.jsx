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
    <div id='pokemon-type-matchup-container' className="m-2 flex flex-col flex-grow">
      <h4 className="text-lg">Type Matchups</h4>
      <div id='pokemon-type-matchup' className="flex flex-col bg-transparent/50 h-full">

        <section id='type-weakness' className="flex h-1/3">
          <h4 className="w-1/3 self-center pl-2">Weak</h4>
          <div className="bg-transparent/25 w-2/3 p-1 flex items-center overflow-x-auto">
            {
              typeEffectiveness.map(element => {
                if (element.effectiveness > 1) {
                  return <div className="mr-3" key={`${element.type}`}><TypeBadge type={element.type} effectiveness={element.effectiveness} /></div>
                } else return null;
              })
            }
          </div>
        </section>

        <section id='type-resistance' className="flex h-1/3 my-1">
          <h4 className="w-1/3 self-center pl-2">Resist</h4>
          <div className="bg-transparent/50 w-2/3 p-1 flex items-center overflow-x-auto">
            {
              typeEffectiveness.map(element => {
                if (element.effectiveness < 1 && element.effectiveness > 0) {
                  return <div className="mr-3" key={`${element.type}`}><TypeBadge type={element.type} effectiveness={element.effectiveness} /></div>
                } else return null;
              })
            }
          </div>
        </section>

        <section id='type-immune' className="flex h-1/3">
          <h4 className="w-1/3 self-center pl-2">Immune</h4>
          <div className="bg-transparent/25 w-2/3 p-1 flex items-center overflow-x-auto">
            {
              typeEffectiveness.map(element => {
                if (element.effectiveness === 0) {
                  return <div className="mr-3" key={`${element.type}`}><TypeBadge type={element.type} effectiveness={element.effectiveness} /></div>
                } else return null;
              })
            }
          </div>
        </section>
      </div>
    </div>
  )

}

export default TypeMatchup;