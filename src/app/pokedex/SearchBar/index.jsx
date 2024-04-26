import React from "react";
import axios from "axios";

import MT from "@/app/lib/clientmaterialtailwind";

import { useDispatch, useSelector } from "react-redux";
import pokeSlice from "@/app/reduxStore/pokeSlice";
import dexSlice from "@/app/reduxStore/dexSlice";

const server = process.env.NEXT_PUBLIC_SERVER;

function SearchBar(props) {

  // const [showAlert, setShowAlert] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const [suggestions, setSuggestions] = useState([]);

  const pokeState = useSelector(state => state.pokemon);
  // const settingsState = useSelector(state => state.settings)
  const dexState = useSelector(state => state.pokedex);

  const dispatch = useDispatch();

  const { setPokemon, handleSearchInputChange } = pokeSlice.actions;
  const { toggleAlert } = dexSlice.actions;
  const { toggleIsLoading } = dexSlice.actions;

  const handleChange = (event) => {
    dispatch(handleSearchInputChange(event.target.value))
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
    <form type='submit' onSubmit={handleSearch} className="min-w-fit w-full flex rounded-md border-white border">
      <input
        onChange={handleChange}
        id='query'
        label="Search"
        className="w-full bg-transparent pl-2"
      />
      <MT.Button color="blue" type="submit" className="rounded-md rounded-l-none max-h-full px-4">
        <i class="fa-solid fa-magnifying-glass fa-xl"></i>
      </MT.Button>
    </form>
  )

}

export default SearchBar;