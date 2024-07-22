import React from 'react'

function UiCard({ children = "This is a card component for in Ui use like: Login, transaction etc" }) {
  return (
    <div className='w-fit h-fit flex flex-col items-center justify-center rounded-3xl md:p-[3vw] p-[20vw] bg-white text-black'>{children}</div>
  )
}

export default UiCard