'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

function page() {
  const router = useRouter();

  return (
    <div>
      {localStorage.getItem("Token") ? <h1>Welcome to Home</h1> : router.push('/LoginSignup')}
    </div>
  )
}

export default page