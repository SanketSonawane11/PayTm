import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState } from '../atoms/authFormAtom';
import axios from 'axios';

export const useFetchAndSetUserData = () => {

    const [user, setUser] = useRecoilState(userState);

    const fetchUserData = async (token) => {
        try {
            const userResponse = await axios.get(`http://localhost:4000/api/v1/users/mydata`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            const balanceResponse = await axios.get(`http://localhost:4000/api/v1/account/getbalance`, {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            if (userResponse.data && balanceResponse.data) {
                const formattedBalance = parseFloat(balanceResponse.data.Balance).toFixed(2);
                await setUser({
                    userInfo: userResponse.data,
                    userBalance: formattedBalance,
                });
                console.log(user.userInfo.firstName);
            } else {
                console.log("Failed to fetch user data or balance data");
            }
        } catch (err) {
            console.log("Error fetching user data or balance data:", err);
        }
    };

    return fetchUserData;
};