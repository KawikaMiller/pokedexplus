import { Inter, Kanit } from 'next/font/google'
import './style/globals.css'
import './style/mystyle.css'
import Header from './pokedex/header'
import Footer from './pokedex/footer'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pokeReducer from './reduxStore';

const inter = Inter({ subsets: ['latin'] })
const kanit = Kanit({subsets: ['latin'], weight: ['100', '400', '700']})

export const metadata = {
  title: 'Pokedex+',
  description: 'Pokedex Plus: The Pokedex for Pokefanatics',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}
