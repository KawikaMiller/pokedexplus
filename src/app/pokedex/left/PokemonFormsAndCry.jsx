import React from "react";
import axios from "axios";
import MT from "@/app/lib/clientmaterialtailwind";

import { useSelector, useDispatch } from "react-redux";
import pokeSlice from "@/app/reduxStore/pokeSlice";
import dexSlice from "@/app/reduxStore/dexSlice";

function PokemonFormsAndCry(props) {
  const dispatch = useDispatch();
  const pokeState = useSelector(state => state.pokemon);
  const { toggleShiny, changeFormIdx, setPokemon } = pokeSlice.actions
  const { toggleIsLoading } = dexSlice.actions;

  const pleaseSearchAlert = () => {
    alert('Please search for a pokemon first')
  }

  const playAudio = () => {
    if (pokeState.pokemon?.name){
      let audio = new Audio(`https://play.pokemonshowdown.com/audio/cries/${pokeState.pokemon.name.toLowerCase()}.mp3`);
      audio.volume = 0.25;
      audio.play();      
    } else {
      // pleaseSearchAlert();
    }
  }

  const handleToggleShiny = () => {
    if(pokeState.pokemon?.name){
      dispatch(toggleShiny(!pokeState.showShiny))      
    } else {
      pleaseSearchAlert();
    }
  }

  const handleToggleForm = async () => {
    if(pokeState.pokemon?.name && pokeState.pokemon.forms.length > 1){
      console.log('toggle form')
      let newApiIdx = pokeState.formIdx + 1;
      if (newApiIdx >= pokeState.pokemon.forms.length) {
        newApiIdx = 0;
      }

      try{
        dispatch(toggleIsLoading(true));
        let foundPokemon = await axios(`${process.env.NEXT_PUBLIC_SERVER}/pokemon/form/${pokeState.pokemon.forms[newApiIdx].name}`);
        dispatch(changeFormIdx(newApiIdx));
        dispatch(setPokemon(foundPokemon.data.pokemon))
        dispatch(toggleIsLoading(false));
      }
      catch(e){
        console.error(e)
        dispatch(toggleIsLoading(false));
      }
     
    } else {
      pleaseSearchAlert();
    }
  }

  return (
    <div id='pokemon-image-toggles' className="flex flex-col justify-around items-center">
      <MT.Button
        color="blue" 
        className="w-8 h-8 p-2 rounded-full hover:bg-cyan-300 m-0.5 fa-solid fa-volume-high" 
        onClick={playAudio}
      />

      <MT.Button
        color="blue" 
        className="w-8 h-8 p-2 rounded-full hover:bg-cyan-300 m-0.5 fa-solid fa-star" 
        onClick={handleToggleShiny}
      >
        
      </MT.Button>

      <MT.Button 
        color="blue" 
        className="w-8 h-8 p-2 hover:bg-cyan-300 m-0.5 rounded-full text-white" 
        onClick={handleToggleForm}
        disabled={pokeState.pokemon.forms.length > 1 ? false : true}
      >
          <img src={`/mega.svg`} alt="mega evolution form change button"/>
      </MT.Button>

      <MT.Button color="blue" className="w-1/4 p-2 hover:bg-cyan-300 m-0.5">D</MT.Button>
    </div>
  )

}

export default PokemonFormsAndCry;