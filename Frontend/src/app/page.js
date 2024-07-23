'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function page() {
  const router = useRouter();

  useEffect(() => {
    if(!localStorage.getItem("Token")) router.push('/LoginSignup')
  })

  return (
    <div>
      <h1>Welcome to Home</h1>
    </div>
  )
}

export default page