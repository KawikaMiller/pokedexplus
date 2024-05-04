'use client';

import MT from "../lib/clientmaterialtailwind";
import { Bars3Icon, UserCircleIcon, HomeIcon, Cog6ToothIcon, PuzzlePieceIcon, BuildingStorefrontIcon, IdentificationIcon, EnvelopeIcon, ArrowLeftOnRectangleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import React, {useState} from "react";

function Header(props) {

  const [isOpen, openDrawer] = useState(false);

  return (
    // putting MT.Drawer in header with 'sticky' messes with the blurred overlay while drawer is open, consider moving MT.Drawer somewhere else and using Redux to control the state
    <header className='h-16 xl:h-32 sticky top-0 xl:static z-20 bg-pkRed text-white flex justify-between items-center px-2  border-b-black border-b-8'>
      <section className="flex w-3/6 justify-between">
        <h1 className="text-5xl mr-6 font-bold hidden xl:block">Pokedex+</h1>
        <MT.Button variant='text' color="white" className="w-14 h-14 p-2 xl:hidden" onClick={() => openDrawer(true)}>
          <Bars3Icon className="h-max w-max min-w-0 min-h-0 text-white"/>
        </MT.Button>
        <MT.Drawer open={isOpen} onClose={() => openDrawer(false)} className="p-4 bg-pkRed">
          <div id='drawer-label' className="w-full flex justify-between items-center">
            <MT.Typography variant="h2">Pokedex +</MT.Typography>
            <XMarkIcon className="w-6 h-auto" onClick={() => openDrawer(false)}/>
          </div>
          <hr className="w-full"></hr>
          <div id='drawer-nav' className="flex flex-col justify-between h-[95%]">
            <MT.List className="h-5/6">
              <MT.ListItem>
                <MT.ListItemPrefix>
                  <HomeIcon className="h-6 w-6 text-white"/>
                </MT.ListItemPrefix>
                <Typography color="white" variant='h6'>Home</Typography>
              </MT.ListItem>

              <MT.ListItem>
                <MT.ListItemPrefix>
                  <UserCircleIcon className="h-6 w-6 text-white"/>
                </MT.ListItemPrefix>
                <Typography color="white" variant='h6'>Profile</Typography>
              </MT.ListItem>

              <MT.ListItem>
                <MT.ListItemPrefix>
                  <PuzzlePieceIcon className="h-6 w-6 text-white"/>
                </MT.ListItemPrefix>
                <Typography color="white" variant='h6'>Team Builder</Typography>
              </MT.ListItem>

              <MT.ListItem>
                <MT.ListItemPrefix>
                  <BuildingStorefrontIcon className="h-6 w-6 text-white"/>
                </MT.ListItemPrefix>
                <Typography color="white" variant='h6'>Items</Typography>
              </MT.ListItem>
              <hr></hr>
              <MT.ListItem>
                <MT.ListItemPrefix>
                  <IdentificationIcon className="h-6 w-6 text-white"/>
                </MT.ListItemPrefix>
                <Typography color="white" variant='h6'>About</Typography>
              </MT.ListItem>

              <MT.ListItem>
                <MT.ListItemPrefix>
                  <EnvelopeIcon className="h-6 w-6 text-white" />
                </MT.ListItemPrefix>
                <Typography color="white" variant='h6'>Contact</Typography>
              </MT.ListItem>
              </MT.List>
              <hr></hr>
              <div>
                <MT.List>
                  <MT.ListItem>
                    <MT.ListItemPrefix>
                      <Cog6ToothIcon className="h-6 w-6 text-white" />
                    </MT.ListItemPrefix>
                    <Typography color="white" variant='h6'>Settings</Typography>
                  </MT.ListItem>

                  <MT.ListItem>
                    <MT.ListItemPrefix>
                      <ArrowLeftOnRectangleIcon className="h-6 w-6 text-white"/>
                    </MT.ListItemPrefix>
                    <Typography color="white" variant='h6'>Log Out</Typography>
                  </MT.ListItem>                       
                </MT.List>
           
              </div>


            
          </div>
        </MT.Drawer>
      </section>

      <section className="flex flex-end flex-col xl:flex-row">
        <MT.Avatar className='xl:hidden bg-white/50' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png" withBorder={true} color="white" />
        <MT.Button variant="filled" color="blue" className="hidden xl:block">Log-In</MT.Button>
        <MT.Button variant="filled" color="blue" className="hidden xl:block">Sign Up</MT.Button>
      </section>
    </header>
  )

}

export default Header;