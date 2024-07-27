import React from 'react'

function AppHeader() {
  return (
    <div style={{backgroundColor: "#00a6fb"}} className='w-[100vw] py-4 px-5 md:py-3 md:px-5 flex justify-center flex-col h-fit min-h-[5rem] md:min-h-[4rem]'>
      <h1 className='appHeader text-[3rem] text-white font-bold'>" Payments made simple</h1>
    </div>
  )
}

export default AppHeader