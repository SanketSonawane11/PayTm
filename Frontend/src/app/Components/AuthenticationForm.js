
import React from 'react'
import { useRecoilState } from 'recoil'
import { formState } from '../atoms/authFormAtom'
import FormContainer from './FormContainer';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
// import { useRouter } from 'next/navigation';

function AuthenticationForm() {

  const [state, setState] = useRecoilState(formState);

  // const router = useRouter();

  function toggleFormSatate() {
    setState(!state);
  }

  // useEffect(() => {
  //   if (localStorage.getItem("Token")) router.push('/');
  // }, [router])

  return (
    <div className="w-[30vw] h-full flex items-center justify-center flex-col">
      <FormContainer>
        {state ? <LoginForm /> : <SignUpForm />}
        <button onClick={toggleFormSatate}>{state ? "Don't have an account? Sign-Up" : "Already a user? Sign-In"}</button>
      </FormContainer>
    </div>
  )
}

export default AuthenticationForm