import React, { useState } from 'react';
import FormField from './FormField';
import FormButton from './FormButton';
import Spinner from './Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useFetchAndSetUserData } from '../lib/userUtils';

function SignUpForm() {

    const fetchAndSet = useFetchAndSetUserData();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Re-entered password doesn't match!", {
                icon: "❗️"
            });
            return;
        }
        setLoading(true);
        await createUser(formData);
    };

    const createUser = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data);
            setFormData({
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: 'user'
            });
            if (response.ok) {
                toast.success("Account created successfully!", {
                    icon: "✅"
                });
                const token = data.user.secret;
                localStorage.setItem("Token", token);
                await fetchAndSet(token);
                router.push('/Home');
            } else {
                toast.error(data.message || "Something went wrong!");
            }
        } catch (err) {
            toast.error("An error occurred while creating the account." + err);
            console.log(err);
        }
        setLoading(false);
    };

    return (
        <div className='w-auto h-full flex items-center justify-center flex-col'>
            <FormField
                label="First Name"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                name="firstName"
            />
            <FormField
                label="Last Name"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                name="lastName"
            />
            <FormField
                label="Set Username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                name="username"
            />
            <FormField
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
            />
            <FormField
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                name="password"
            />
            <FormField
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
            />
            <FormButton text={loading ? <Spinner /> : "Create Account"} onClick={handleSubmit} />
            <ToastContainer />
        </div>
    );
}

export default SignUpForm;
