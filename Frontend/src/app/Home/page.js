'use client'

import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { userState } from '../atoms/authFormAtom';
import CardComponent from '../Components/Card';
import AppHeader from '../Components/AppHeader';
import UserProfile from '../Components/UserProfile'
import FormField from '../Components/FormField';
import axios from 'axios';

function ProfilePage() {
  const user = useRecoilValue(userState);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  console.log(user.userInfo.username);

  useEffect(() => {
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
  }, [filter, user.userInfo.username]);

  if (!user) {
    return <div>Loading...</div>;
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
            <UserProfile />
            {Array.isArray(users) && users.map((user) => (
              <CardComponent key={user._id} username={user.username} firstName={user.firstName} lastName={user.lastName} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

// 'use client'

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Button from "../components/Button";
// import Card from  '../Components/Card'

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [filter, setFilter] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("Token");
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/v1/users/bulk?filter=${filter}`, {
//           headers: {
//             'authorization': token,
//           }
//         });
//         setUsers(response.data.user);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, [filter]);

//   return (
//     <>
//       <div className="font-bold mt-6 text-lg">
//         Users
//       </div>
//       <div className="my-2">
//         <input
//           onChange={(e) => setFilter(e.target.value)}
//           type="text"
//           placeholder="Search users..."
//           className="w-full px-2 py-1 border rounded border-slate-200"
//         />
//       </div>
//       <div>
//         {users.map((user) => (
//           <Card key={user._id} username={user.username} lastName={user.lastName} firstName={user.firstName} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default Users;

// const User = ({ user }) => {
//   const router = useRouter();
//   return (
//     <div className="flex justify-between">
//       <div className="flex">
//         <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
//           <div className="flex flex-col justify-center h-full text-xl">
//             {user.firstName[0]}
//           </div>
//         </div>
//         <div className="flex flex-col justify-center h-full">
//           <div>
//             {user.firstName} {user.lastName}
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col justify-center h-full">
//         <Button
//           onClick={() => {
//             router.push(`/send?id=${user._id}&name=${user.firstName}`);
//           }}
//           label={"Send Money"}
//         />
//       </div>
//     </div>
//   );
// };
