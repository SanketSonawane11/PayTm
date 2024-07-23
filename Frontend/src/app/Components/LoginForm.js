import React, { useState } from 'react'
import FormField from './FormField'

function loginForm() {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  return (
    <div>loginForm</div>
  )
}

export default loginForm