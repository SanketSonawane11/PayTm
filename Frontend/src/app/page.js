'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Heading from './Components/Heading';
import { useRecoilState } from 'recoil';
import { userState, formState } from './atoms/authFormAtom';
import 'react-toastify/dist/ReactToastify.css';


function HomePage() {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [form, setForm] = useRecoilState(formState);
  const [loggedIn, setLoggedIn] = useState(true);

  const logout = async () => {
    localStorage.removeItem("Token");
    setLoggedIn(false);
    await setUser(null);
  };

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      router.push('/LoginSignup');
    }
    else {
      router.push('/Home');
    }
  }, [loggedIn, router]);

  const handleFormToggle = () => {
    setForm((prevForm) => !prevForm);
  };

  return (
    <div>
      <Heading title="Home" />
      <h2 onClick={logout} className='text-[5vw]'>Logout</h2>
      <button onClick={handleFormToggle}>Toggle Form</button>
      <div>Form state: {form ? 'Open' : 'Closed'}</div>
      {user && (
        <div>
          <h1>Hello, {user.userInfo.firstName}</h1>
          <p>Username: {user.userInfo.username}</p>
          <p>Email: {user.userInfo.email}</p>
          <p>Current Balance: {user.userBalance}</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
