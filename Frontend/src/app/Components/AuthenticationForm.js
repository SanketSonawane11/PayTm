import React from 'react'
import { useRecoilState } from 'recoil'
import { formState } from '../atoms/authFormAtom'

function AuthenticationForm() {

    const [state, setState] = useRecoilState(formState);

    function toggleFormSatate(){
        setState(!state);
    }

  return (
    <div>
        <h1 onClick={toggleFormSatate}>Click me to toggle</h1>
    </div>
  )
}

export default AuthenticationForm