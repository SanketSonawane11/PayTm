'use client'

import React from 'react';
import { useRecoilValue } from 'recoil';
import { userData } from '../atoms/userAtom';
import Card from '../Components/Card';

function page() {
  const userInfo = useRecoilValue(userData);
  console.log(userInfo);
  return (
    <div>
      <h1>Hello, {userInfo.firstName}</h1>
      <p>Username: {userInfo.username}</p>
      <p>Email: {userInfo.email}</p>
      <Card />
    </div>
  );
}

export default page;
