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
import Transactions from './modules/Transactions'
import Balance from './modules/Balance'

export default async function Home() {
  const user = await currentUser();

  if(user){
    return(
      <>
      <Navbar userid={user.id} username = {user.fullName}></Navbar>
      <Transactions></Transactions>
      <Balance userid={user.id}></Balance>
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
