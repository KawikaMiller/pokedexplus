import React from "react";

function Header(props){

  return(
    <header className='h-32 bg-pkRed text-white flex justify-between items-center px-2'>
      <section className="flex w-3/6 justify-between">
        <h1 className="text-5xl mr-6 font-bold">Pokedex+</h1>
        <nav className="flex justify-between items-end font-semibold w-3/5 m-0 p-0">
          <a>Home</a>
          <a>About</a>
          <a>Contact</a>
          <a>Theme</a>
        </nav>        
      </section>

      <section className="w-1/6 flex justify-evenly">
        <button className="bg-blue-500 p-2 rounded-md">Log-In</button>
        <button className="bg-blue-500 p-2 rounded-md">Sign Up</button>
      </section>
    </header>
  )

}

export default Header;