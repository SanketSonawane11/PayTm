import { useRouter } from 'next/navigation';

function useSmartRouter() {

    const router = useRouter();

    const smartRedirect = () => {
        if (localStorage.getItem('Token')) return;
        else router.push('/LoginSignup');
    }

    return smartRedirect;
}

export default useSmartRouter