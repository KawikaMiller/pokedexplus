import { Inter } from 'next/font/google'
import './style/globals.css'
import './style/mystyle.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pokedex+',
  description: 'Pokedex Plus: The Pokedex for Pokefanatics',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className='h-32 bg-blue-700'>THIS IS THE HEADER</header>
        {children}
        <footer className='h-32'>THIS IS THE FOOTER</footer>
      </body>
    </html>
  )
}
