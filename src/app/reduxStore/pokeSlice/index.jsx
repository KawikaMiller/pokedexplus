import { createSlice } from "@reduxjs/toolkit";

const pokeSlice = createSlice({
  name: 'pokemon',
  initialState: {
    searchInput: 'missingName',
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
      const nameFromPokeApi = action.payload.name.split('-')
      //retains move data from initial search since pokeapi does not return that information with mega or gmax forms
      if(state.pokemon?.moves && (nameFromPokeApi[1] === 'gmax')){
        action.payload.moves = state.pokemon.moves;
      }
      console.log('setting pokemon in state!')
      state.pokemon = action.payload
    },
    handleFormChange(state, action){
      state.pokemon.baseExpYield = action.payload.baseExpYield
      state.pokemon.height = action.payload.height;
      state.pokemon.weight = action.payload.weight;
      state.pokemon.stats = action.payload.stats;
      state.pokemon.cry = action.payload.cry
      state.pokemon.abilities = action.payload.abilities
      action.payload.moves.length ? 
        state.pokemon.moves = action.payload.moves : null
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