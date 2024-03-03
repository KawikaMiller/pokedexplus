'use client';

import Main from './pokedex/main'
import Header from './pokedex/header';
import Footer from './pokedex/footer';

import MT from './lib/clientmaterialtailwind'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pokeReducer from './reduxStore';

let pokeStore = configureStore({
  reducer: pokeReducer
})

export default function Home() {
  return (
    // <>
      <MT.ThemeProvider>
        <Provider store={pokeStore}>
          <Header />
          <Main />
          <Footer />
        </Provider>
      </MT.ThemeProvider>
    // </>
  )
}
