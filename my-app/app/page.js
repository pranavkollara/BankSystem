import {
  ClerkProvider,
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import Navbar from './modules/Navbar'

export default async function Home() {
  const user = await currentUser();

  if(user){
    return(
      <>
      <Navbar userid={user.id} username = {user.fullName}></Navbar>
      
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
