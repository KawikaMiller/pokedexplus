import { createSlice } from "@reduxjs/toolkit";

const dexSlice = createSlice({
  name: 'pokedex',
  initialState: {
    mainScreenIdx: 0,
    dexTabIdx: 0,
    dexIdx: 0,
    moveIdx: 0,
    abilityIdx: 0,
    isLoading: false,
    showAlert: false,
    alertMessage: 'default alert message'
  },
  reducers: {
    setMainScreenIdx(state, action){
      state.mainScreenIdx = action.payload
    },
    setDexTabIdx(state, action){
      state.dexTabIdx = action.payload
    },
    setDexIdx(state, action){
      state.dexIdx = action.payload
    },
    setMoveIdx(state, action){
      state.moveIdx = action.payload
    },
    setAbilityIdx(state, action){
      console.log(action.payload)
      state.abilityIdx = action.payload
    },
    toggleIsLoading(state, action){
      state.isLoading = action.payload;
    },
    toggleAlert(state, action){
      state.showAlert = action.payload.status;
      state.alertMessage = action.payload.message || 'default alert message';
    }
  }
})

export default dexSlice;