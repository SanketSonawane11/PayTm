'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Heading from './Components/Heading';
import { useRecoilState } from 'recoil';
import { userState, formState } from './atoms/authFormAtom';
import 'react-toastify/dist/ReactToastify.css';
import useSmartRouter from './lib/smartRouter';
import AppHeader from './Components/AppHeader';


function HomePage() {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [form, setForm] = useRecoilState(formState);
  const [loggedIn, setLoggedIn] = useState(true);
  const smartRouter = useSmartRouter();

  const logout = async () => {
    localStorage.removeItem("Token");
    setLoggedIn(false);
    await setUser(null);
  };

  useEffect(() => {

    smartRouter();
    router.push('/Home');
  }, [loggedIn, router]);

  const handleFormToggle = () => {
    setForm((prevForm) => !prevForm);
  };

  return (
    <div>
      <AppHeader />
      <Heading title="Loading the app..." />
    </div >
  );
}

export default HomePage;
