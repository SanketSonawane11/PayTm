'use client'

import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { userState } from '../atoms/authFormAtom';
import CardComponent from '../Components/Card';
import AppHeader from '../Components/AppHeader';
import FormField from '../Components/FormField';
import axios from 'axios';
import useSmartRouter from '../lib/smartRouter';
import Spinner from '../Components/Spinner';

function ProfilePage() {
  const user = useRecoilValue(userState);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const smartRouter = useSmartRouter();

  useEffect(() => {
    smartRouter();
    const token = localStorage.getItem("Token");
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/users/bulk?filter=${filter}`, {
          headers: {
            'authorization': token,
          }
        });
        console.log(response.data)
        const filteredUsers = response.data.user.filter(users => users.username !== user.userInfo.username);
        console.log(filteredUsers);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [filter]);

  if (!user) {
    return <div className='w-full h-[100vh] flex items-center justify-center'><Spinner /></div>;
  }

  return (
    <div className="min-h-[100vw] w-full bg-neutral-950 relative antialiased">
      <AppHeader />
      <div className='flex items-center justify-center flex-col'>
        <div className='w-[100vw] md:w-[65vw] px-5 md:px-0 flex items-center justify-center flex-col'>
          <div className="my-2 w-[60vw]">
            <FormField
              label=""
              type="text"
              placeholder="Search Users"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              name="Search Users"
            />
          </div>
          <div className="w-fit px-5 grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
            {
              Array.isArray(users) && users.map((user) => (
                <CardComponent key={user._id} username={user.username} firstName={user.firstName} lastName={user.lastName} />
              ))
            }
          </div >
        </div >
      </div >
    </div >
  );
}

export default ProfilePage;