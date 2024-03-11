import React from "react";
import LeftSide from "../left";
import RightSide from "../right";
import MT from "@/app/lib/clientmaterialtailwind";

import { useDispatch, useSelector } from "react-redux";
import dexSlice from "@/app/reduxStore/dexSlice";

function Main(props) {

  // const [openAlert, setOpenAlert] = useState(true)
  const dispatch = useDispatch();
  const dexState = useSelector(state => state.pokedex);
  const { toggleAlert } = dexSlice.actions;

  function timeoutAlert() {
    setTimeout(dispatch(toggleAlert({
      status: false,
      message: ''
    })), 5000)
  }

  return (
    <main className='lg:flex lg:justify-center bg-blue-gray-700'>
      <div id='pokedex-container' className="flex flex-col lg:flex-row justify-center p-2 py-10 lg:h-[97vh] place-content-center lg:w-[80%]">
        <LeftSide />

        {/* <div id="mid-spacer" className="w-20 bg-pkRed border-red-700 border-2"></div> */}

        <RightSide />

        {/* <div id='side-tabs' className="w-20">
        <div id='tab1' className="h-20 bg-pkRed w-full relative right-2 flex justify-center items-center rounded-tr-md hover:bg-blue-600 z-1">
          1
        </div>
        <div id='tab1' className="h-20 bg-pkRed w-full relative right-2 flex justify-center items-center hover:bg-blue-600 z-1">
          2
        </div>
        <div id='tab1' className="h-20 bg-pkRed w-full relative right-2 flex justify-center items-center  hover:bg-blue-600 z-1">
          3
        </div>
        <div id='tab1' className="h-20 bg-pkRed w-full relative right-2 flex justify-center items-center rounded-br-md hover:bg-blue-600 z-1">
          4
        </div>
      </div> */}
        <MT.Alert open={dexState.showAlert} onClose={() => dispatch(toggleAlert({status: !dexState.showAlert, message: 'test'}))} className="bg-pkRed sticky bottom-20 z-[1000] border-white border-2 self-center lg:justify-center w-5/6">{dexState.alertMessage}</MT.Alert>
      </div>
    </main>
  )

}

export default Main;