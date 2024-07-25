import { useSetRecoilState } from 'recoil';
import { userData } from '../atoms/userAtom';

export const useFetchAndSetUserData = () => {
    const setUser = useSetRecoilState(userData);

    const fetchUserData = async (token) => {
        console.log(`Token: ${token} is received and sent`);
        try {
            const response = await fetch('http://localhost:4000/api/v1/users/mydata', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            const data = await response.json();
            if (response.ok) {
                setUser({
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    username: data.username,
                    role: data.role
                });
                console.log("User Data Set in Recoil:", data);
            } else {
                console.log("Failed to fetch user data:", data.message);
            }
        } catch (err) {
            console.log("Error fetching user data:", err);
        }
    };

    return fetchUserData;
};
