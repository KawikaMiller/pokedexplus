import { createSlice } from "@reduxjs/toolkit";

const pokeSlice = createSlice({
  name: 'pokemon',
  initialState: {
    searchInput: '',
    pokemon: undefined,
    isShiny: false,
    spriteIdx: 0,
    spriteType: 'world',
  },
  reducers: {
    handleSearchInputChange(state, action){
      state.searchInput = action.payload
    },
    setPokemon(state, action){
      const temp = action.payload.name.split('-')
      //retains move data from initial search since pokeapi does not return that information with mega or gmax forms
      if(state.pokemon?.moves && (temp[1] === 'mega' || temp[1] === 'gmax')){
        action.payload.moves = state.pokemon.moves;
      }
      console.log('setting pokemon in state!')
      state.pokemon = action.payload
    },
    toggleShiny(state, action){
      state.isShiny = !state.isShiny;
    },
    setSpriteIdx(state, action){
      state.spriteIdx = action.payload
    },
    setSpriteType(state, action){
      state.spriteType = action.payload
    }
  }
})

export default pokeSlice;