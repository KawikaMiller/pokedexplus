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
    <div id='pokemon-type-matchup-container' className="flex flex-col h-full">
      <div id='pokemon-type-matchup' className="flex flex-col bg-transparent/50 h-full">

        <section id='type-weakness' className="flex h-1/3">
          <h4 className="min-w-[4.5rem] grow self-center pl-2">Weak</h4>
          <div className="bg-transparent/25 w-full p-1 flex items-center overflow-x-auto">
            {
              typeEffectiveness.map(element => {
                if (element.effectiveness > 1) {
                  return <div className="mr-3" key={`${element.type}`}><TypeBadge type={element.type} effectiveness={element.effectiveness} /></div>
                } else return null;
              })
            }
          </div>
        </section>

        <section id='type-resistance' className="flex h-1/3 border-y">
          <h4 className="min-w-[4.5rem] grow self-center pl-2">Resist</h4>
          <div className="bg-transparent/50 w-full p-1 flex items-center overflow-x-auto">
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
          <h4 className="min-w-[4.5rem] grow self-center pl-2">Immune</h4>
          <div className="bg-transparent/25 w-full p-1 flex items-center overflow-x-auto">
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