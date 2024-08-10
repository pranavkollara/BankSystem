
import {
  ClerkProvider,
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import Router from './pages/Router'

export default async function Home() {
  const user = await currentUser();
  


  if(user){
    return(
      <>
      <Router userid={user.id} username={user.fullName}></Router>
      
      </>
    )
  }


  return (
    <>
    <div className='w-full h-screen flex flex-row justify-center items-center'>

    <SignInButton></SignInButton>
    </div>
    </>
  );
}
