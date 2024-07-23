import React from 'react'

function FormButton({ text, onClick, login }) {
    return (
        <div className="h-fit w-[78%] md:px-[0.8vw] m-[3vw] md:m-[1vw]">
            <button onClick={onClick} className="w-[100%] py-[2vw] px-[2.3vw] md:py-[0.5vw] bg-gray-300 text-[4vw] md:text-[1.1vw] hover:bg-gray-800 hover:text-white hover:rounded-md active:scale-95 transition-all ease-out duration-100 font-semibold rounded-lg">
                {text}
            </button>
        </div>
    )
}

export default FormButton