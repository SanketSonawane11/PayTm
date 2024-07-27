import { atom } from 'recoil';

const localStorageEffect = (key) => ({ setSelf, onSet }) => {

    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
        try {
            setSelf(JSON.parse(savedValue));
        } catch (error) {
            console.error('Error parsing localStorage value:', error);
        }
    }

    onSet((newValue, _, isReset) => {
        if (isReset) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(newValue));
        }
    });
};

export const userState = atom({
    key: 'userInformationFromBackend',
    default: {
        userInfo: {},
        userBalance: 0,
    },
    effects: [localStorageEffect('userState')],
});

export const formState = atom({
    key: "formState",
    default: true,
});