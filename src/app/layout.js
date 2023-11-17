import { Inter } from 'next/font/google'
import './style/globals.css'
import './style/mystyle.css'
import Header from './pokedex/header'
import Footer from './pokedex/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pokedex+',
  description: 'Pokedex Plus: The Pokedex for Pokefanatics',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
