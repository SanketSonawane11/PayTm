import { atom } from 'recoil';

export const userData = atom({
    key: 'userData',
    default: {
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        role: ''
    }
});
