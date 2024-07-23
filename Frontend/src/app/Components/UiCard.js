import React from 'react'

function UiCard({ children = "This is a card component for in Ui use like: Login, transaction etc" }) {
  return (
    <div className='min-w-[80vw] min-h-[30vh] md:min-w-[40vw] md:min-h-[30vh] shadow-2xl flex flex-col items-center justify-center rounded-3xl md:py-[1vw] md:px-[2vw] p-[20vw] bg-white text-black'>{children}</div>
  )
}

export default UiCard