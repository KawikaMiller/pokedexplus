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
const kanit = Kanit({ subsets: ['latin'], weight: ['100', '400', '700'] })

export const metadata = {
  title: 'Pokedex+',
  description: 'Pokedex Plus: The Pokedex for Pokefanatics',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </head>
      <body className={kanit.className}>
        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}
