import React from "react";
import MT from "@/app/lib/clientmaterialtailwind";

import { useSelector } from "react-redux";

function PokemonFormsAndCry(props) {
  const pokeState = useSelector(state => state.pokemon);

  const playAudio = () => {
    if (pokeState.pokemon?.name){
      let audio = new Audio(`https://play.pokemonshowdown.com/audio/cries/${pokeState.pokemon.name.toLowerCase()}.mp3`);
      audio.volume = 0.3;
      audio.play();      
    } else {
      // pleaseSearchAlert();
    }
  }

  return (
    <div id='pokemon-image-toggles' className="flex justify-around items-center">
      <MT.Button color="blue" className="w-1/4 p-2 hover:bg-cyan-300 mx-0.5" onClick={playAudio}>Cry</MT.Button>
      <MT.Button color="blue" className="w-1/4 p-2 hover:bg-cyan-300 mx-0.5">Shiny</MT.Button>
      <MT.Button color="blue" className="w-1/4 p-2 hover:bg-cyan-300 mx-0.5">Mega</MT.Button>
      <MT.Button color="blue" className="w-1/4 p-2 hover:bg-cyan-300 mx-0.5">Dyna</MT.Button>
    </div>
  )

}

export default PokemonFormsAndCry;