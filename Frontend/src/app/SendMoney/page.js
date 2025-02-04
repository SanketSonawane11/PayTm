'use client';

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useState, Suspense, use, useEffect } from 'react';
import { useFetchAndSetUserData } from '../lib/userUtils';
import { toast, ToastContainer } from 'react-toastify';
import useSmartRouter from '../lib/smartRouter';

const Page = () => {
    const updateData = useFetchAndSetUserData();
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const username = searchParams.get('username');
    const [amount, setAmount] = useState(0);
    const smartRouter = useSmartRouter();

    useEffect(() => {
        smartRouter();
    }, [username, name, amount]);

    const handleTransfer = async () => {
        if (amount <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }
        try {
            await axios.post(
                `http://localhost:4000/api/v1/account/transfer`,
                {
                    to: username,
                    amount,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem('Token'),
                    },
                }
            );
            await updateData(localStorage.getItem('Token'));
            toast.success(`Rs.${amount} transferred successfully`);
        } catch (err) {
            toast.error(`Error: ${err.message}`);
        }
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <button
                                onClick={handleTransfer}
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                            >
                                Initiate Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

const PageWithSuspense = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Page />
        </Suspense>
    );
};

export default PageWithSuspense;