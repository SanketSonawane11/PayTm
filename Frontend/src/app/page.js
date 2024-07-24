'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Heading from './Components/Heading'

function page() {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(true);

  const logout = () => {
    localStorage.removeItem("Token");
    setLoggedIn(!loggedIn);
  };

  useEffect(() => {
    if (!localStorage.getItem("Token")) router.push('/LoginSignup')
  }, [loggedIn]);


  return (
    <div onClick={logout}>
      <Heading title="Home" />
    </div>
  )
}

export default page