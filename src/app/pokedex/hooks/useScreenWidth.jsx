import React, { useState, useEffect } from "react";



// custom hook to detect changes in screen width
export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWidthChange = () => {
      console.log('handleWidthChange: ', window.innerWidth)
      setScreenWidth(window.innerWidth)
    };

    window.addEventListener('resize', handleWidthChange);

    return () => {
      window.removeEventListener('resize', handleWidthChange)
    }
  }, [])

  return screenWidth
}