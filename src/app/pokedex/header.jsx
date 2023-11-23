'use client';

import MT from "../lib/clientmaterialtailwind";
import { Bars2Icon, Bars3Icon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import React, {useState} from "react";

function Header(props) {

  const [isOpen, openDrawer] = useState(false);

  return (
    <header className='h-16 lg:h-32 sticky top-0 lg:static z-20 bg-pkRed text-white flex justify-between items-center px-2'>
      <section className="flex w-3/6 justify-between">
        <h1 className="text-5xl mr-6 font-bold hidden lg:block">Pokedex+</h1>
        <MT.Button variant='text' color="white" className="w-14 h-14 p-2 lg:hidden" onClick={() => openDrawer(true)}>
          <Bars3Icon className="h-max w-max min-w-0 min-h-0 text-white"/>
        </MT.Button>
        <MT.Drawer open={isOpen} onClose={() => openDrawer(false)} className="p-4 bg-pkRed">
          <div id='drawer-label' className="w-full">
            <MT.Typography variant="h2">Pokedex +</MT.Typography>
            <hr className="w-full"></hr>
          </div>
          <div id='drawer-nav' className="flex flex-col">
            <Typography>Home</Typography>
            <Typography>Team Builder</Typography>
            <Typography>Items</Typography>
            <Typography>About</Typography>
            <Typography>Contact</Typography>
            <Typography>Settings</Typography>
            <Typography>Log Out</Typography>
          </div>
        </MT.Drawer>
        {/* <nav className="flex justify-between items-end font-semibold w-3/5 m-0 p-0">
          <a>Home</a>
          <a>About</a>
          <a>Contact</a>
          <a>Theme</a>
        </nav>         */}
      </section>

      <section className="w-1/6 flex justify-evenly flex-col lg:flex-row">
        <MT.Avatar className='block lg:hidden bg-white/50' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png" withBorder={true} color="white" />
        <MT.Button variant="filled" color="blue" className="hidden lg:block">Log-In</MT.Button>
        <MT.Button variant="filled" color="blue" className="hidden lg:block">Sign Up</MT.Button>
      </section>
    </header>
  )

}

export default Header;