import React from 'react'

function formContainer({ children }) {
    return (
        <div className='w-full h-full p-[5vw] flex items-center justify-center flex-col md:p-[0.5vw] bg-transparent rounded-lg '>
            {children}
        </div>
    )
}

export default formContainer