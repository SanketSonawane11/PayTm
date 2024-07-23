import React, { useState } from 'react';
import { LuCircle } from "react-icons/lu";
import { MdOutlineHideSource } from "react-icons/md";


function FormField({ label, type, placeholder, value, onChange, name }) {
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(type === 'password');

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e) => setIsFocused(!!e.target.value);

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    return (
        <div className="relative w-[60vw] min-w-[50%] md:min-w-[40%] md:w-[20vw] my-4">
            <label
                className={`absolute top-2 left-2 px-1 transition-all duration-300 bg-white ${isFocused || value ? '-translate-y-6 text-sm text-gray-500' : 'text-base text-gray-500'}`}
            >
                {label}
            </label>
            <input
                type={hidePassword ? 'password' : 'text'}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                name={name}
                className="w-full p-2 border rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {type === 'password' && (
                <div
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                >
                    {hidePassword ? <MdOutlineHideSource /> : <LuCircle />}
                </div>
            )}
        </div>
    );
}

export default FormField;
