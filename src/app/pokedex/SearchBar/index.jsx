import React, {useState} from "react";
import axios from "axios";
import { pokedex } from "@/app/lib/pokedex";

import MT from "@/app/lib/clientmaterialtailwind";

import { useDispatch, useSelector } from "react-redux";
import pokeSlice from "@/app/reduxStore/pokeSlice";
import dexSlice from "@/app/reduxStore/dexSlice";

const server = process.env.NEXT_PUBLIC_SERVER;

function SearchBar(props) {

  // const [showAlert, setShowAlert] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const pokeState = useSelector(state => state.pokemon);
  // const settingsState = useSelector(state => state.settings)
  const dexState = useSelector(state => state.pokedex);

  const dispatch = useDispatch();

  const { setPokemon, handleSearchInputChange } = pokeSlice.actions;
  const { toggleAlert } = dexSlice.actions;
  const { toggleIsLoading } = dexSlice.actions;

  const handleChoose = (value) => {
    dispatch(handleSearchInputChange(value))
  }

  const handleChange = (event) => {
    handleChoose(event.target.value)
  }

  const handleSearch = async (event, searchInput = pokeState.searchInput) => {
    event.preventDefault();
    dispatch(toggleIsLoading(true))
    try {
      console.log(searchInput)
      console.log('Querying PokeAPI...');
      let foundPokemon = await axios(`${server}/pokemon/${searchInput}`);
      console.log(foundPokemon);
      dispatch(setPokemon(foundPokemon.data.pokemon));
      dispatch(toggleIsLoading(false))
    }
    catch (e) {
      dispatch(toggleAlert({ status: !dexState.showAlert, message: 'Could not find pokemon. Please check your spelling' }))
      dispatch(toggleIsLoading(false))
    }
  }

  return (
    <div className="w-full relative">
      <form type='submit' onSubmit={handleSearch} className="min-w-fit w-full flex rounded-md border-white border">
        <input
          onFocus={() => setShowSuggestions(true)}
          // onBlur={() => setShowSuggestions(false)}
          onChange={handleChange}
          id='query'
          label="Search"
          className="w-full bg-transparent pl-2"
          value={pokeState.searchInput}
        />
        <MT.Button color="blue" type="submit" className="rounded-md rounded-l-none max-h-full px-4">
          <i class="fa-solid fa-magnifying-glass fa-xl"></i>
        </MT.Button>
      </form>
      <div id='search-suggestions' className={`${showSuggestions ? 'block' : 'hidden'} h-fit max-h-40 overflow-y-scroll w-full bg-white text-black absolute z-[100] rounded-b-md flex flex-col capitalize pl-1`}>
        {
          pokedex.map((pkmn, idx) => {

            if(
              pkmn.toLowerCase().startsWith(pokeState.searchInput.toLowerCase())
              ||
              (Number(pokeState.searchInput) !== NaN && Number(pokeState.searchInput) === idx + 1)
            ){
              return <div onClick={(e) => {handleChoose(pkmn); handleSearch(e, pkmn); setShowSuggestions(false)}} className="hover:bg-blue-500 hover:text-white z-[101]">{pkmn}</div>
            }

          })
        }
      </div>
    </div>
  )

}

export default SearchBar;