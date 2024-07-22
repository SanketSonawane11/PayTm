import React from 'react'

function Heading({title="Enter your title"}) {
  return (
    <div className='text-[9vw] md:text-[3vw] font-bold mx-[1vw] my-[1.5vw] md:mx-[1.5vw] md:my-[2vw]'>  {title}
    </div>
  )
}

export default Heading