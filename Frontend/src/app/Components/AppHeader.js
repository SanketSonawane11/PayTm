import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import { userState } from '../atoms/authFormAtom';
import { useRouter } from 'next/navigation';
import useSmartRouter from '../lib/smartRouter';

function AppHeader() {

  const setUserData = useSetRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const smartRouter = useSmartRouter();

  useEffect(() => {
    smartRouter();
  }, []);

  const logout = async () => {
    localStorage.removeItem("Token");
    await setUserData(null);
    router.push('/LoginSignup');
  }

  return (
    <header className='w-full bg-slate-900 py-4 px-5 md:py-3 md:px-6 flex flex-col md:flex-row justify-between items-center h-fit min-h-[4rem]'>
      <Link href='/Home'
        className='text-[2rem] md:text-[2.5rem] font-bold mb-2 md:mb-0'
        style={{
          background: 'linear-gradient(135deg, #1E90FF, #00BFFF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '700',
        }}
      >
        &quot;Payments Made Simple&quot;
      </Link>
      <div className='flex space-x-4'>
        <Link href="/Profile" className='text-slate-100 hover:bg-white hover:text-black transition-colors duration-300 py-2 px-4 rounded-md border border-navy-600'>
          Profile
        </Link>
        <button onClick={logout} className='text-slate-100 hover:bg-red-700 hover:text-white transition-colors duration-300 py-2 px-4 rounded-md border border-red-700'>
          Logout
        </button>
      </div>
    </header>
  );
}

export default AppHeader;