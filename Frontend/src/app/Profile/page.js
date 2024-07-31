'use client'

import React, { useEffect } from "react";
import { WobbleCard } from "../Components/ui/wobble.card";
import AppHeader from "../Components/AppHeader";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/authFormAtom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { MdHorizontalRule } from "react-icons/md";
import { FaWallet } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { InfiniteMovingCards } from "../Components/ui/infinite-moving-cards";
import useSmartRouter from "../lib/smartRouter";
import Spinner from "../Components/Spinner";

function Profile() {

    const user = useRecoilValue(userState);

    const smartRouter = useSmartRouter();

    useEffect(() => {
        smartRouter();
    }, [user]);

    if (!user) return <div className="w-full h-[100vh] flex items-center justify-center"><Spinner /></div>

    return (
        <div className="bg-slate-950">
            <AppHeader />
            <div className="p-10 md:p-5 grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
                <WobbleCard
                    containerClassName="p-3 md:p-2 col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]">
                    <div className="max-w-xs">
                        <h2 className="text-left text-balance text-[2rem] md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white/70">
                            Fast, Secure, and Reliable Transactions
                        </h2>
                        <p className="mt-4 text-left text-[1.2rem] font-medium text-neutral-200/80">
                            Experience a new standard in payments with our platform. We deliver not just speed and security but a level of reliability and sophistication that sets us apart.
                        </p>
                    </div>
                </WobbleCard>
                <WobbleCard containerClassName="col-span-1 p-3 md:p-2 min-h-[300px]">
                    <h2 className="max-w-80 text-left text-balance text-[2rem] md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white/50">
                        Profile
                    </h2>
                    <MdHorizontalRule className="text-white/60" />
                    <div className="mt-3 text-white">
                        <h5 className="font-semibold my-2 text-[1.4rem]">{user.userInfo.firstName} {user.userInfo.lastName}</h5>
                        <div className="flex justify-center flex-col gap-2 my-2 text-white/70 font-medium">
                            <h6 className="flex items-center">
                                <MdOutlineAlternateEmail />
                                {user.userInfo.username}</h6>
                            <h6 className="flex items-center gap-2"><SiGmail />
                                {user.userInfo.email}</h6>
                            <h6 className="flex items-center gap-2"><FaWallet />
                                {user.userBalance}</h6>
                            <h6 className="flex items-center gap-2">                                {user.userInfo.role === "user" ? <span className="flex items-center gap-2"><FaUser /> User</span> : <span className="flex items-center gap-2"><RiAdminFill /> Admin</span>
                            }</h6>
                        </div>
                    </div>
                </WobbleCard>
                <div className="w-fit mt-5">
                    <div className="md:max-w-[100%] max-w-[80vw] mb-5">
                        <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white/70">
                            Look what people want to say about their experience with us
                        </h2>
                        <div className="h-[40rem] my-4 rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                            <InfiniteMovingCards
                                items={testimonials}
                                direction="left"
                                speed="slow"
                            />
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Profile;

const testimonials = [
    {
        quote:
            "Seamless experience and exceptional service. The platform exceeded my expectations with its speed and security, making transactions effortless.",
        name: "Alex Johnson",
        title: "Entrepreneur",
    },
    {
        quote:
            "A game-changer in payment solutions. I appreciate the intuitive interface and reliable performance. It’s become an essential tool for my business.",
        name: "Maria Garcia",
        title: "Small Business Owner",
    },
    {
        quote:
            "The best transaction platform I've used. It's fast, secure, and easy to navigate. Highly recommended for anyone looking for a trustworthy solution.",
        name: "Michael Brown",
        title: "Freelancer",
    },
    {
        quote:
            "Excellent service and support. The platform handles all my payment needs with impressive efficiency and reliability.",
        name: "Jessica Lee",
        title: "Consultant",
    },
    {
        quote:
            "I’ve used many payment systems before, but this one stands out for its superior security and customer service. It’s a top choice for secure transactions.",
        name: "David Smith",
        title: "Tech Enthusiast",
    },
];
