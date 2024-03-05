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
    if (pokeState.pokemon?.name) {
      let audio = new Audio(`https://play.pokemonshowdown.com/audio/cries/${pokeState.pokemon.name.toLowerCase()}.mp3`);
      audio.volume = 0.25;
      audio.play();
    } else {
      // pleaseSearchAlert();
    }
  }

  const handleToggleShiny = () => {
    if (pokeState.pokemon?.name) {
      dispatch(toggleShiny(!pokeState.showShiny))
    } else {
      pleaseSearchAlert();
    }
  }

  const handleToggleForm = async () => {
    if (pokeState.pokemon?.name) {
      console.log('toggle form')
      let newApiIdx = pokeState.formIdx + 1;
      if (newApiIdx >= pokeState.pokemon.forms.length) {
        newApiIdx = 0;
      }

      try {
        dispatch(toggleIsLoading(true));
        let foundPokemon = await axios(`${process.env.NEXT_PUBLIC_SERVER}/pokemon/form/${pokeState.pokemon.forms[newApiIdx].name}`);
        dispatch(changeFormIdx(newApiIdx));
        dispatch(setPokemon(foundPokemon.data.pokemon))
        dispatch(toggleIsLoading(false));
      }
      catch (e) {
        console.error(e)
        dispatch(toggleIsLoading(false));
      }

    } else {
      pleaseSearchAlert();
    }
  }

  const handleAltForms = () => {

  }

  function Button({ children, onClick, disabled }) {
    return (
      <button
        className="w-8 h-8 p-1.5 bg-blue-500 rounded-full hover:bg-cyan-300 m-1 flex justify-center items-center disabled:opacity-50 disabled:hover:bg-blue-500"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }
 
  return (
    <div id='pokemon-image-toggles' className="flex justify-around items-center">
      <Button
        onClick={playAudio}
      >
        <div className="fa-solid fa-volume-high" />
      </Button>

      <Button
        onClick={handleToggleShiny}
      >
        <div className="fa-solid fa-star"></div>
      </Button>

      <Button
        onClick={handleToggleForm}
        disabled={pokeState.pokemon?.forms?.length > 1 ? false : true}
      >
        <img src={`/mega.svg`} alt="mega evolution form change button" />
      </Button>

      <Button>
        <img src={`/gmax.svg`} alt="gigantamax form change button" className="w-40"/>
      </Button>

      <Button
        onClick={props.changeSpriteIdx}
        disabled={props.missingSprites ? false : true}
      >
        <div className="fa-solid fa-earth-americas"></div>
      </Button>

    </div>
  )

}

export default PokemonFormsAndCry;