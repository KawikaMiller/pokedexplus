export const modalStyle = {
  container: 'bg-black/50',
  header: 'flex justify-between items-center bg-pkRed border-b-4 border-black rounded-t-md text-white',
  body: 'flex flex-col justify-center items-center bg-blue-gray-200 text-black',
  footer: 'flex justify-end items-center bg-white text-black border-t-4 border-black rounded-b-md'
}

export const cardStyle = {
  main: 'bg-pkRed flex flex-col p-2 max-h-[100%] min-h-0 lg:w-1/2',
  header: 'min-h-[3rem] w-full flex justify-between border-b-2 border-b-black/25 p-1',
  body: {
    container: 'flex flex-col justify-between min-h-0 lg:h-full',
    top: 'flex flex-col lg:flex-row h-fit lg:h-[75%]',
    bot: 'flex min-h-0',
  },
}

export const blueTagStyle = {
  container: 'flex flex-col relative',
  label: 'w-fit text-white text-center bg-blue-500 rounded-t-md px-2 bottom-full left-0 text-sm'
}

