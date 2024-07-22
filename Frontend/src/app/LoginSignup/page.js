'use client'

import React, { useState } from 'react'
import UiCard from '../Components/UiCard'
import Heading from '../Components/Heading'
import { useRecoilValue } from 'recoil'
import { formState } from '../atoms/authFormAtom'
import AuthenticationForm from '../Components/AuthenticationForm'

function page() {

  // const [login, setLogin] = useRecoilState(formState);
  const login = useRecoilValue(formState);

  return (
    <div className=' flex items-center justify-center w-[100vw] h-[100vh]'>
      <UiCard>
        <Heading title={login ? "Login" : "Sign Up"} />
        <AuthenticationForm />
      </UiCard>
    </div>
  )
}

export default page