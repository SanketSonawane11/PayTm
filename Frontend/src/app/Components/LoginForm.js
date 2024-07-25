// import React, { useState } from 'react'
// import FormField from './FormField'
// import { useRouter } from 'next/navigation';
// import FormButton from './FormButton';
// import Spinner from './Spinner';
// import { toast, ToastContainer } from 'react-toastify';
// import { useSetRecoilState } from 'recoil';
// import { userData } from '../atoms/authFormAtom'

// function loginForm() {

//   const router = useRouter();
//   const setUserData = useSetRecoilState(userData);

//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:4000/api/v1/users/signin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       console.log(data);
//       if (response.ok) {
//         toast.success("Logged in successfully!", {
//           icon: "✅"
//         });
//         localStorage.setItem("Token", data.token);
//         console.log(data.userData);
//         const userDataResponse = {
//           email: data.userData.email || '',
//           firstName: data.userData.firstName || '',
//           lastName: data.userData.lastName || '',
//           username: data.userData.username || '',
//           role: data.userData.role || '',
//         };
//         setUserData(userDataResponse);
//         console.log("User Data Set in Recoil:", data.userData);
//         const token = localStorage.getItem("Token");
//         console.log(token);
//         router.push('/');
//       } else {
//         toast.error(data.message || "Something went wrong!");
//       }
//     } catch (err) {
//       toast.error("An error occurred while logging in." + err);
//       console.log(err);
//     }
//     setLoading(false);
//   }

//   return (
//     <div className='w-auto h-full flex items-center justify-center flex-col'>
//       <FormField
//         label="Username"
//         type="text"
//         value={formData.username}
//         onChange={handleChange}
//         name="username"
//       />
//       <FormField
//         label="Password"
//         type="password"
//         value={formData.password}
//         onChange={handleChange}
//         name="password"
//       />
//       <FormButton text={loading ? <Spinner /> : "Login"} onClick={handleSubmit} />
//       <ToastContainer />
//     </div>
//   )
// }

// export default loginForm


'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormField from './FormField';
import FormButton from './FormButton';
import Spinner from './Spinner';
import { toast, ToastContainer } from 'react-toastify';
import { useFetchAndSetUserData } from '../lib/userUtils';

function LoginForm() {
  const router = useRouter();
  const fetchAndUpdate = useFetchAndSetUserData();

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
        localStorage.setItem('Token', data.token);
        console.log("Token stored:", data.token);  
        await fetchAndUpdate(data.token);
        console.log("Atom updated");
        router.push('/');
      } else {
        toast.error(data.message || 'Something went wrong!');
      }
    } catch (err) {
      toast.error('An error occurred while logging in.');
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className='w-auto h-full flex items-center justify-center flex-col'>
      <FormField
        label='Username'
        type='text'
        value={formData.username}
        onChange={handleChange}
        name='username'
      />
      <FormField
        label='Password'
        type='password'
        value={formData.password}
        onChange={handleChange}
        name='password'
      />
      <FormButton text={loading ? <Spinner /> : 'Login'} onClick={handleSubmit} />
      <ToastContainer />
    </div>
  );
}

export default LoginForm;
