"use client";

import React from 'react'
import { BackgroundGradient } from "../Components/ui/background-gradient";

function UiCard({ children = "This is a card component for in Ui use like: Login, transaction etc" }) {
  return (
    <BackgroundGradient className="rounded-[22px] bg-white dark:bg-zinc-900">
      <div className='min-w-[80vw] min-h-[30vh] md:min-w-[40vw] md:min-h-[30vh] shadow-2xl flex flex-col items-center justify-center rounded-3xl md:py-[1vw] md:px-[2vw] p-[20vw] bg-white text-black'>{children}</div>
    </BackgroundGradient>
  )
}

export default UiCard