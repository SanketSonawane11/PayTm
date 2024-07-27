import React from 'react'
import {
    GlowingStarsBackgroundCard,
    GlowingStarsDescription,
    GlowingStarsTitle,
} from "./ui/glowing-stars";
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/authFormAtom';

function UserProfile() {

    const userData = useRecoilValue(userState);

    return (
        <div className='min-w-[50vw] md:min-w-fit m-3'>
            <GlowingStarsBackgroundCard>
                <GlowingStarsTitle>{userData.userInfo.firstName} {userData.userInfo.lastName}</GlowingStarsTitle>
                <div className="flex justify-between items-end">
                    <GlowingStarsDescription>
                        <p>@{userData.userInfo.username}</p>
                        <p>{userData.userInfo.email}</p>
                        <p>Rs. {userData.userBalance}</p>
                        {/* <p>{userData.userInfo.role === 'user' ? "User" : "Admin"}</p> */}
                        <p>{userData.userInfo.__id}</p>
                    </GlowingStarsDescription>
                    <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
                        <Icon />
                    </div>
                </div>
            </GlowingStarsBackgroundCard>
        </div>
    )
}

const Icon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-4 w-4 text-white stroke-2"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
        </svg>
    );
};


export default UserProfile