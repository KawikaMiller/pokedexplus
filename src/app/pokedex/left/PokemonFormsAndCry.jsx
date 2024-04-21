import React, { useEffect } from "react";
import axios from "axios";
import MT from "@/app/lib/clientmaterialtailwind";

import { useSelector, useDispatch } from "react-redux";
import pokeSlice from "@/app/reduxStore/pokeSlice";
import dexSlice from "@/app/reduxStore/dexSlice";

const server = process.env.NEXT_PUBLIC_SERVER;

function PokemonFormsAndCry(props) {
  const dispatch = useDispatch();
  const pokeState = useSelector(state => state.pokemon);
  const { setPokemon, handleFormChange } = pokeSlice.actions
  const { toggleIsLoading } = dexSlice.actions;


  const playAudio = () => {
    if (pokeState.pokemon?.name) {
      let audio = new Audio(pokeState.pokemon.cry);
      audio.volume = 0.25;
      audio.play();
    } else {
      // pleaseSearchAlert();
    }
  }


  useEffect(() => {
    if(pokeState.pokemon?.name){
      try {
        axios.get(`${server}/pokemon/${pokeState.pokemon.forms[pokeState.spriteType][pokeState.spriteIdx].apiId}`)
        .then(res => {
          console.log(res.data)
          dispatch(setPokemon(res.data.pokemon))
        })
      }
      catch (e) {
        console.log(e)
      }
    }
  }, [pokeState.spriteType])

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
        onClick={props.handleIsShiny}
      >
        <div className="fa-solid fa-star"></div>
      </Button>

      <Button
        onClick={() => {
          props.changeImgSrc('mega')
          // handleFormChange(() => props.changeImgSrc('mega'))
        }}
        disabled={pokeState.pokemon?.forms.mega.length > 0 ? false : true}
      >
        <img src={`/mega.svg`} alt="mega evolution form change button" />
      </Button>

      <Button
        onClick={() => props.changeImgSrc('gmax')}
        disabled={pokeState.pokemon?.forms.gmax.length > 0 ? false : true}
      >
        <img src={`/gmax.svg`} alt="gigantamax form change button" className="w-40" />
      </Button>

      <Button
        onClick={() => props.changeImgSrc('world')}
        disabled={pokeState.pokemon?.forms.world.length > 0 ? false : true}
      >
        <div className="fa-solid fa-earth-americas"></div>
      </Button>

    </div>
  )

}

export default PokemonFormsAndCry;