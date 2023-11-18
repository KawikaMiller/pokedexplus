import { combineReducers } from "@reduxjs/toolkit";
import pokeSlice from "./pokeSlice";
import dexSlice from "./dexSlice";

const pokeReducer = combineReducers({
  pokemon: pokeSlice.reducer,
  pokedex: dexSlice.reducer,
})

export default pokeReducer;