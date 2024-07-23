import React, { useState } from 'react'
import FormField from './FormField'
import { useRouter } from 'next/navigation';
import FormButton from './FormButton';
import Spinner from './Spinner';
import { toast, ToastContainer } from 'react-toastify';

function loginForm() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/v1/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Logged in successfully!", {
          icon: "✅"
        });
        localStorage.setItem("Token", data.secret);
        // token = localStorage.getItem("Token");
        router.push('/');
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (err) {
      toast.error("An error occurred while logging in." + err);
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <div className='w-auto h-full flex items-center justify-center flex-col'>
      <FormField
        label="Username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        name="username"
      />
      <FormField
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        name="password"
      />
      <FormButton text={loading ? <Spinner /> : "Login"} onClick={handleSubmit} />
      <ToastContainer />
    </div>
  )
}

export default loginForm